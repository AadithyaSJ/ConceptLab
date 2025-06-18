import React, { useState, useEffect } from 'react';
import { auth, db } from '../firebase';
import { collection, getDocs, doc, getDoc } from 'firebase/firestore';
import Calendar from 'react-calendar';
import 'react-calendar/dist/Calendar.css';
import LawSelector from '../components/LawSelector';
import LawGraph from '../components/LawGraph';
import PerformanceTable from '../components/PerformanceChart';
import Title from '../components/Title';
import Title2 from '../components/Title2';
import '../styles/calendar.css';
import { ref, uploadBytes, getDownloadURL } from 'firebase/storage';
import { storage } from '../firebase';



const lawsMeta = [
  { id: "1", title: "Law of Inertia" },
  { id: "2", title: "Law of Acceleration" },
  // ... more laws
];

export default function Dashboard() {
  const [user, setUser] = useState(null);
  const [lawId, setLawId] = useState(null);
  const [allAttempts, setAllAttempts] = useState([]);
  const [datesCount, setDatesCount] = useState({});
  const [loading, setLoading] = useState(true);
  const [photoURL, setPhotoURL] = useState(null);
  const [uploading, setUploading] = useState(false);

  const handlePhotoUpload = async (e) => {
  const file = e.target.files[0];
  if (!file || !auth.currentUser) return;

  try {
    setUploading(true);
    const storageRef = ref(storage, `profilePhotos/${auth.currentUser.uid}`);
    await uploadBytes(storageRef, file);
    const url = await getDownloadURL(storageRef);
    setPhotoURL(url);

    // Update user doc
    await setDoc(doc(db, 'users', auth.currentUser.uid), { photoURL: url }, { merge: true });
  } catch (err) {
    console.error("Photo upload failed:", err);
  } finally {
    setUploading(false);
  }
};

  useEffect(() => {
    const fetchUserData = async () => {
      const u = auth.currentUser;
      if (!u) return;
      
      try {
        const userDoc = await getDoc(doc(db, 'users', u.uid));
        const userData = userDoc.exists() ? userDoc.data() : {};
        setPhotoURL(userData.photoURL || null);

        const age = userData.dob ? calculateAge(userData.dob) : null;
        setUser({
          name: u.displayName,
          email: u.email,
          age,
        });

        // Fetch quiz attempts
        const all = [];
        for (const law of lawsMeta) {
          const ref = collection(db, `quizAttempts/${u.uid}/${law.id}`);
          const snaps = await getDocs(ref);
          snaps.forEach(doc => all.push({ ...doc.data(), lawId: law.id }));
        }
        setAllAttempts(all);
      } catch (err) {
        console.error('Error fetching user data or quiz attempts:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchUserData();
  }, []);

  useEffect(() => {
    const counts = {};
    allAttempts.forEach(a => {
      if (a.date) {
        const [day, month, year] = a.date.split('/');
        const formatted = `${year}-${month.padStart(2, '0')}-${day.padStart(2, '0')}`;
        counts[formatted] = (counts[formatted] || 0) + 1;
      }
    });
    setDatesCount(counts);
  }, [allAttempts]);

  const calculateAge = (dobStr) => {
    const birthDate = new Date(dobStr);
    const today = new Date();
    let age = today.getFullYear() - birthDate.getFullYear();
    const m = today.getMonth() - birthDate.getMonth();
    if (m < 0 || (m === 0 && today.getDate() < birthDate.getDate())) {
      age--;
    }
    return age;
  };

  if (loading) return <div className="text-white p-6">Loading...</div>;

  return (
  <div className="px-6 py-10 text-white min-h-screen space-y-8">
    <Title text1="Your Dashboard" />

    {/* Top Row: User Info + Calendar + Graph */}
    <div className="flex flex-col md:flex-row gap-6 justify-center">
      
      <div className="relative bg-white/10 backdrop-blur-md rounded-lg p-4 flex flex-col items-center gap-3 md:w-1/5 w-full overflow-hidden">
  {/* 3D kid background image */}
  <img
    src="/boy1.png" // your 3D kid image
    alt="Kid Background"
    className="absolute -top-10 w-64 opacity-30 ml-20 pt-60 pointer-events-none"
  />
  
  {/* Avatar */}
  <img
    src={photoURL || '/boy2.png'}
    alt="Profile"
    className="w-24 h-24 rounded-full object-cover border border-white z-10"
  />

  {/* Change photo label */}
  <label className="text-sm cursor-pointer hover:underline z-10">
    <span className="text-blue-300">
      {uploading ? 'Uploading...' : 'Change Photo'}
    </span>
    <input
      type="file"
      accept="image/*"
      onChange={handlePhotoUpload}
      className="hidden"
    />
  </label>

  {/* User info */}
  <div className="text-md font-bold text-center z-10"><Title2 title={user.name}/></div>
  <div className="text-md font-bold text-white/100 text-center z-10">Email: {user.email}</div>
  {user.age !== null && (
    <div className="text-md font-bold text-white/100 text-center z-10">Age: {user.age}</div>
  )}
</div>



      {/* Calendar */}
      <div className="bg-white/10 backdrop-blur-md rounded-lg p-4 md:w-1/4 w-full">
        <h2 className="text-2xl font-semibold mb-2">Quiz Calendar</h2>
        <Calendar
          tileClassName={({ date }) => {
            const key = date.toLocaleDateString('en-CA');
            const count = datesCount[key];
            const classes = [];

            if (count) {
              classes.push('has-quiz', `intensity-${Math.min(count, 5)}`);
            }

            const today = new Date();
            const isToday =
              date.getDate() === today.getDate() &&
              date.getMonth() === today.getMonth() &&
              date.getFullYear() === today.getFullYear();

            if (isToday) classes.push('not-today');
            return classes.join(' ');
          }}
          className="rounded-xl text-white bg-white/10 backdrop-blur-xl"
        />
      </div>

      {/* Graph + Selector */}
      <div className="bg-white/10 backdrop-blur-md rounded-lg p-4 flex flex-col gap-4 md:w-1/2 w-full">
        <h2 className="text-2xl font-semibold">Law-wise performance</h2>
        <LawSelector laws={lawsMeta} selectedLawId={lawId} onChange={setLawId} />
        {lawId && <LawGraph selectedLaw={lawId} />}
      </div>
    </div>

    {/* Performance Table Below */}
    <div className="bg-white/10 backdrop-blur-md rounded-lg p-4">
      <h2 className="text-2xl font-semibold mb-4">Detailed Attempts</h2>
      <PerformanceTable attempts={allAttempts.filter(a => a.lawId === lawId)} />
    </div>
  </div>
);

}
