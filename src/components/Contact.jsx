import { useState, useRef } from "react";
import { motion } from "framer-motion";
import emailjs from '@emailjs/browser';
import { styles } from "../styles";
import { SectionWrapper } from "../hoc";
import { EarthCanvas } from "./canvas";
import { slideIn } from "../utils/motion";

// template_o5uryba
// service_bh5ug5t
// rA7PvZze2DIvgX8WR

const Contact = () => {
  const formRef = useRef();

  const [form, setForm] = useState({
    name: '',
    email: '',
    message: '',
  });

  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm({ ...form, [name]: value });
  }

  const handleSubmit = (e) => {
    e.preventDefault();
    setLoading(true);

    emailjs.send(
      'service_bh5ug5t',
      'template_o5uryba',
      {
        from_name: form.name,
        to_name: 'Aadithya',
        from_email: form.email,
        to_email: 'aadithyasuresh2725@gmail.com',
        message: form.message
      },
      'rA7PvZze2DIvgX8WR'
    )
    .then(() => {
      setLoading(false);
      alert('Thank you. I will get back to you as soon as possible.');
      setForm({
        name: '',
        email: '',
        message: ''
      });
    }, (error) => {
      setLoading(false);
      console.log(error);
      alert('Something went wrong.');
    });
  }

  return (
    <div className="xl:mt-12 xl:flex-row flex-col-reverse gap-10 flex overflow-hidden">
      <motion.div
        variants={slideIn('left', 'tween', 0.2, 1)}
        className="flex-[0.75] bg-[rgba(17,12,37,1)] backdrop-blur-md border border-white/10 p-8 rounded-2xl shadow-lg"
      >
        <p className={`${styles.heroSubText}`}>Get in touch</p>
        <h3 className={`${styles.heroHeadText}`}>Contact.</h3>
        <form
          ref={formRef}
          onSubmit={handleSubmit}
          className="mt-12 flex flex-col gap-8"
        >
          <label className="flex flex-col">
            <span className="text-white font-medium mb-4">Your Name</span>
            <input
              type="text"
              name="name"
              value={form.name}
              onChange={handleChange}
              placeholder="What's your name?"
              className="bg-[rgba(20,17,48,1)] focus:outline-none focus:ring-2 focus:ring-white/20 placeholder:text-secondary text-white py-4 px-6 rounded-lg border-none font-medium"
            />
          </label>
          <label className="flex flex-col">
            <span className="text-white font-medium mb-4">Your Email</span>
            <input
              type="email"
              name="email"
              value={form.email}
              onChange={handleChange}
              placeholder="What's your email?"
              className="bg-[rgba(20,17,48,1)] focus:outline-none focus:ring-2 focus:ring-white/20 placeholder:text-secondary text-white py-4 px-6 rounded-lg border-none font-medium"
            />
          </label>
          <label className="flex flex-col">
            <span className="text-white font-medium mb-4">Your Message</span>
            <textarea
              rows="7"
              name="message"
              value={form.message}
              onChange={handleChange}
              placeholder="What do you want to say?"
              className="bg-[rgba(20,17,48,1)] focus:outline-none focus:ring-2 focus:ring-white/20 placeholder:text-secondary text-white py-4 px-6 rounded-lg border-none font-medium"
            />
          </label>
          <button
            type="submit"
            className="bg-[rgba(20,17,48,1)] hover:bg-[rgba(30,25,65,1)] transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-white/20 py-3 px-8 w-fit text-white font-bold shadow-md shadow-primary rounded-xl"
          >
            {loading ? 'Sending...' : 'Send'}
          </button>
        </form>
      </motion.div>

      <motion.div
        variants={slideIn('right', 'tween', 0.2, 1)}
        className="xl:flex-1 xl:h-auto md:h-[550px] h-[350px]"
      >
        <EarthCanvas />
      </motion.div>
    </div>
  );
};

export default SectionWrapper(Contact, "contact");
