import { LineChart, HeartPulse, Database, Film, Users } from 'lucide-react';

export const projects = [
  {
    title: 'Customer Churn Analysis',
    description: 'Analyzed customer churn patterns using Python and machine learning algorithms to identify key factors affecting customer retention.',
    image: 'https://www.shutterstock.com/image-photo/customer-churn-shown-using-text-600nw-2443621059.jpg?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80',
    tags: ['Python', 'Machine Learning', 'Data Analysis'],
    icon: LineChart,
    github: 'https://github.com/CollinsNyatundo/BCG-customer-churn-visualization',
    category: 'Data Analysis'
  },
  {
    title: 'Revenue Analysis Dashboard',
    description: 'Built an interactive dashboard for historical revenue analysis using Power BI and SQL for data processing.',
    image: 'https://www.shutterstock.com/shutterstock/videos/3495967415/thumb/12.jpg?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80',
    tags: ['Power BI', 'SQL', 'Data Visualization'],
    icon: Database,
    github: 'https://github.com/CollinsNyatundo/Analyzing-Historical-Revenue-Data-and-Building-a-Dashboard',
    category: 'Data Visualization'
  },
  {
    title: 'Heart Disease Classification',
    description: 'Developed a machine learning model to predict heart disease using various classification algorithms.',
    image: 'https://images.unsplash.com/photo-1628348070889-cb656235b4eb?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80',
    tags: ['Python', 'Scikit-learn', 'Classification'],
    icon: HeartPulse,
    github: 'https://github.com/CollinsNyatundo/Heart-Disease-Classification',
    category: 'Machine Learning'
  },
  {
    title: 'Best Streaming Service Analysis',
    description: 'Analyzed various streaming services to determine the best option based on content, pricing, and user satisfaction.',
    image: 'https://creatorsfortheculture.com/wp-content/uploads/2020/03/IMG_8921-1024x1024.jpg?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80',
    tags: ['Python', 'Data Analysis', 'Visualization'],
    icon: Film,
    github: 'https://github.com/CollinsNyatundo/Best-Streaming-Service-Analysis',
    category: 'Data Analysis'
  },
  {
    title: 'Bank Customer Segmentation',
    description: 'Implemented customer segmentation for a bank using clustering algorithms to personalize marketing strategies and improve customer satisfaction.',
    image: 'https://st2.depositphotos.com/4428871/9888/i/450/depositphotos_98881588-stock-photo-customer-word-cloud.jpg?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80',
    tags: ['Python', 'Machine Learning', 'Clustering'],
    icon: Users,
    github: 'https://github.com/CollinsNyatundo/Bank-Customer-Segmentation-and-Personalization',
    category: 'Machine Learning'
  }
];