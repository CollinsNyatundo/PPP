import React from 'react';
import { motion } from 'framer-motion';
import { Code2, Database, LineChart, Brain } from 'lucide-react';

const skills = [
  { name: 'Machine Learning', icon: Brain, color: 'text-purple-400' },
  { name: 'Data Analysis', icon: LineChart, color: 'text-blue-400' },
  { name: 'Python/R', icon: Code2, color: 'text-green-400' },
  { name: 'SQL/NoSQL', icon: Database, color: 'text-yellow-400' },
];

const About = () => {
  return (
    <section id="about" className="py-20 bg-gray-900">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
            About Me
          </h2>
          <div className="w-20 h-1 bg-purple-600 mx-auto"></div>
        </motion.div>

        <div className="grid md:grid-cols-2 gap-8 lg:gap-12 items-center">
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5 }}
            viewport={{ once: true }}
            className="relative aspect-square max-w-md mx-auto md:max-w-full"
          >
            <div className="relative w-full h-full rounded-2xl overflow-hidden shadow-2xl">
              <img
                src="/Collins Profile Photo.jpg"
                alt="Collins Nyagaka"
                className="w-full h-full object-cover object-center"
                loading="lazy"
              />
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5 }}
            viewport={{ once: true }}
            className="text-gray-300 space-y-6"
          >
            <p className="text-lg sm:text-xl">
              I'm a passionate Data Scientist with experience in turning complex
              data into actionable insights. My expertise spans machine
              learning, statistical analysis, and data visualization.
            </p>
            <p className="text-lg sm:text-xl">
              Currently working on cutting-edge AI projects, I combine technical
              expertise with business acumen to deliver impactful solutions that
              drive decision-making and innovation.
            </p>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {skills.map((skill, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.3, delay: index * 0.1 }}
                  viewport={{ once: true }}
                  className="flex items-center space-x-3 bg-gray-800/50 backdrop-blur-sm p-4 rounded-lg hover:bg-gray-800 transition-colors"
                >
                  <skill.icon className={`w-6 h-6 ${skill.color}`} />
                  <span className="text-white font-medium">{skill.name}</span>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default About;