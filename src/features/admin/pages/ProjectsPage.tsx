import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Plus, Search } from 'lucide-react';
import { ContentGrid } from '../components/grid/ContentGrid';
import { ContentCard } from '../components/cards/ContentCard';
import { ProjectEditor } from '../components/editors/ProjectEditor';
import { useApi } from '../../../hooks/useApi';
import { api } from '../../../lib/api/client';

export const ProjectsPage = () => {
  const [isEditorOpen, setIsEditorOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [filter, setFilter] = useState('all');
  const [editingProject, setEditingProject] = useState<any>(null);

  const { data: projects, loading, refetch } = useApi(api.fetchProjects);

  const handleEdit = (project: any) => {
    setEditingProject(project);
    setIsEditorOpen(true);
  };

  const handleDelete = async (id: string) => {
    if (window.confirm('Are you sure you want to delete this project?')) {
      try {
        await api.deleteProject(id);
        refetch();
      } catch (error) {
        console.error('Error deleting project:', error);
      }
    }
  };

  const handleSave = async (data: any) => {
    try {
      if (editingProject) {
        await api.updateProject(editingProject.id, data);
      } else {
        await api.createProject(data);
      }
      setIsEditorOpen(false);
      setEditingProject(null);
      refetch();
    } catch (error) {
      console.error('Error saving project:', error);
    }
  };

  const filteredProjects = projects?.filter(project => {
    const matchesSearch = project.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      project.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
      project.tags.some(tag => tag.toLowerCase().includes(searchTerm.toLowerCase()));
    const matchesFilter = filter === 'all' || project.category === filter;
    return matchesSearch && matchesFilter;
  });

  return (
    <div className="space-y-8">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
        >
          <h1 className="text-3xl font-bold text-white mb-2">Projects</h1>
          <p className="text-gray-400">Manage your portfolio projects</p>
        </motion.div>

        <motion.button
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          onClick={() => {
            setEditingProject(null);
            setIsEditorOpen(true);
          }}
          className="flex items-center gap-2 px-4 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition-colors"
        >
          <Plus className="w-5 h-5" />
          New Project
        </motion.button>
      </div>

      <div className="flex flex-col sm:flex-row gap-4">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
          <input
            type="text"
            placeholder="Search projects..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-10 pr-4 py-2 bg-gray-800 border border-gray-700 rounded-lg text-white focus:outline-none focus:border-purple-500"
          />
        </div>
        <select
          value={filter}
          onChange={(e) => setFilter(e.target.value)}
          className="bg-gray-800 border border-gray-700 rounded-lg text-white px-4 py-2 focus:outline-none focus:border-purple-500"
        >
          <option value="all">All Categories</option>
          <option value="Data Analysis">Data Analysis</option>
          <option value="Data Visualization">Data Visualization</option>
          <option value="Machine Learning">Machine Learning</option>
        </select>
      </div>

      {loading ? (
        <div className="flex justify-center">
          <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-purple-500"></div>
        </div>
      ) : (
        <ContentGrid>
          {filteredProjects?.map((project) => (
            <ContentCard
              key={project.id}
              title={project.title}
              description={project.description}
              image={project.image}
              metadata={{
                category: project.category,
                tags: project.tags.join(', '),
                date: new Date(project.created_at).toLocaleDateString(),
              }}
              onEdit={() => handleEdit(project)}
              onDelete={() => handleDelete(project.id)}
            />
          ))}
        </ContentGrid>
      )}

      {isEditorOpen && (
        <ProjectEditor
          project={editingProject}
          onSave={handleSave}
          onClose={() => {
            setIsEditorOpen(false);
            setEditingProject(null);
          }}
        />
      )}
    </div>
  );
};