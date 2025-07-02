import React, { useState, useEffect } from 'react';
import { auth, db, storage } from '../firebase';
import { collection, getDocs, doc, getDoc, setDoc } from 'firebase/firestore';
import { ref, uploadBytes, getDownloadURL } from 'firebase/storage';
import Calendar from 'react-calendar';
import 'react-calendar/dist/Calendar.css';
import '../styles/calendar.css';

import LawSelector from '../components/LawSelector';
import LawGraph from '../components/LawGraph';
import PerformanceTable from '../components/PerformanceChart';
import Title from '../components/Title';
import Title2 from '../components/Title2';
import lawsData from '../data/lawsData';
import LoaderSpinner from '../components/LoadingSpinner';

const lawsMeta = Object.entries(lawsData).map(([id, law]) => ({
  id,
  title: law.name || "Untitled Law"
}));

export default function Dashboard() {
  const [user, setUser] = useState(null);
  const [graphLawId, setGraphLawId] = useState(null);
  const [tableLawIds, setTableLawIds] = useState([]);
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

        const all = [];
        for (const law of lawsMeta) {
          const ref = collection(db, `quizAttempts/${u.uid}/${law.id}`);
          const snaps = await getDocs(ref);
          snaps.forEach(doc => {
            const data = doc.data();
            all.push({ ...data, lawId: law.id, lawTitle: law.title });
          });
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

  if (loading) return <LoaderSpinner />;

  return (
    <div className="px-6 py-10 text-white min-h-screen space-y-8">
      <Title text1="Your Dashboard" />

      {/* Top Row: User Info + Calendar + Graph */}
      <div className="flex flex-col md:flex-row gap-6 justify-center">
        
        {/* Profile Card */}
        <div className="relative bg-white/10 backdrop-blur-md rounded-lg p-4 flex flex-col items-center gap-3 md:w-1/5 w-full overflow-hidden">
          <img
            src="/boy1.png"
            alt="Kid Background"
            className="absolute -top-10 w-64 opacity-30 ml-20 pt-60 pointer-events-none"
          />
          <img
            src={photoURL || '/boy2.png'}
            alt="Profile"
            className="w-24 h-24 rounded-full object-cover border border-white z-10"
          />
          <label className="text-sm cursor-pointer hover:underline z-10">
            <span className="text-blue-300">{uploading ? 'Uploading...' : 'Change Photo'}</span>
            <input type="file" accept="image/*" onChange={handlePhotoUpload} className="hidden" />
          </label>
          <div className="text-md font-bold text-center z-10"><Title2 title={user.name} /></div>
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

        {/* Graph */}
        <div className="bg-white/10 backdrop-blur-md rounded-lg p-4 flex flex-col gap-4 md:w-1/2 w-full">
          <h2 className="text-2xl font-semibold">Law-wise performance</h2>
          <LawSelector laws={lawsMeta} selectedLawId={graphLawId} onChange={setGraphLawId} />
          {graphLawId && <LawGraph selectedLaw={graphLawId} />}
        </div>
      </div>

      {/* Performance Table with Multi-select Filter */}
<div className="bg-white/10 backdrop-blur-md rounded-lg p-4">
  <div className="flex justify-between items-center mb-4">
    <h2 className="text-2xl font-semibold">Detailed Attempts</h2>

    {/* Dropdown Multi-select */}
    <details className="relative">
      <summary className="cursor-pointer bg-white/10 px-4 py-2 rounded text-sm text-white hover:bg-white/20">
        Filter Laws ▾
      </summary>
      <div className="absolute mt-1 right-0 bg-white/80 text-black border border-white/10 shadow-lg p-2 rounded z-50 max-h-64 overflow-auto w-60 space-y-1">
        {lawsMeta.map(law => {
          const isChecked = tableLawIds.includes(law.id);
          return (
            <label
              key={law.id}
              className={`flex items-center justify-between text-sm px-2 py-1 rounded cursor-pointer 
                ${isChecked ? 'bg-yellow-400 text-black font-medium' : 'hover:bg-white/10'}
              `}
            >
              <span>{law.title}</span>
              <input
                type="checkbox"
                checked={isChecked}
                onChange={(e) => {
                  const updated = e.target.checked
                    ? [...tableLawIds, law.id]
                    : tableLawIds.filter(id => id !== law.id);
                  setTableLawIds(updated);
                }}
                className="form-checkbox text-yellow-400 h-4 w-4"
              />
            </label>
          );
        })}
      </div>
    </details>
  </div>

  <PerformanceTable
    attempts={
      tableLawIds.length > 0
        ? allAttempts.filter(a => tableLawIds.includes(a.lawId))
        : allAttempts
    }
    showLawName
  />
</div>


    </div>
  );
}
