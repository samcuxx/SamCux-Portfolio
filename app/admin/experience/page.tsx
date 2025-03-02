"use client";

import { useState } from "react";
import { useQuery, useMutation } from "convex/react";
import { api } from "@/convex/_generated/api";
import { Id } from "@/convex/_generated/dataModel";
import { Loader2, Plus, Edit, Trash2, Briefcase, MoveUp, MoveDown, X } from "lucide-react";
import ExperienceForm from "@/components/Admin/ExperienceForm";

export default function ExperiencePage() {
  const experienceItems = useQuery(api.experience.getAll);
  const deleteExperience = useMutation(api.experience.remove);
  const reorderExperience = useMutation(api.experience.reorder);
  
  const [isAddingNew, setIsAddingNew] = useState(false);
  const [editingId, setEditingId] = useState<Id<"experience"> | null>(null);
  const [isDeleting, setIsDeleting] = useState<Id<"experience"> | null>(null);
  const [error, setError] = useState<string | null>(null);

  const handleDelete = async (id: Id<"experience">) => {
    setError(null);
    setIsDeleting(id);
    
    try {
      await deleteExperience({ id });
    } catch (err) {
      setError((err as Error).message);
    } finally {
      setIsDeleting(null);
    }
  };

  const handleMoveUp = async (index: number) => {
    if (index <= 0 || !experienceItems) return;
    
    const newOrder = [...experienceItems];
    [newOrder[index - 1], newOrder[index]] = [newOrder[index], newOrder[index - 1]];
    
    try {
      await reorderExperience({ 
        orderedIds: newOrder.map(item => item._id) 
      });
    } catch (err) {
      setError((err as Error).message);
    }
  };

  const handleMoveDown = async (index: number) => {
    if (!experienceItems || index >= experienceItems.length - 1) return;
    
    const newOrder = [...experienceItems];
    [newOrder[index], newOrder[index + 1]] = [newOrder[index + 1], newOrder[index]];
    
    try {
      await reorderExperience({ 
        orderedIds: newOrder.map(item => item._id) 
      });
    } catch (err) {
      setError((err as Error).message);
    }
  };

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-[#101010] dark:text-[#94A9C9]">
          Work Experience Management
        </h1>
        <p className="text-gray-600 dark:text-[#66768f] mt-1">
          Manage your professional work experience
        </p>
      </div>

      {error && (
        <div className="p-4 bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800/30 rounded-lg">
          <p className="text-sm text-red-600 dark:text-red-400">{error}</p>
        </div>
      )}

      <div className="bg-white dark:bg-[#131C31] rounded-xl p-6 shadow-sm border border-gray-100 dark:border-[#222F43]">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-lg font-semibold text-[#101010] dark:text-[#94A9C9] flex items-center gap-2">
            <Briefcase className="w-5 h-5 text-[#ffe400]" />
            Work Experience
          </h2>
          <button
            onClick={() => setIsAddingNew(!isAddingNew)}
            className="px-3 py-2 bg-[#ffe400] rounded-md text-[#101010] 
              hover:bg-[#ffd700] focus:outline-none focus:ring-2 focus:ring-[#ffe400] 
              flex items-center gap-2"
          >
            {isAddingNew ? (
              <>
                <X className="w-4 h-4" />
                Cancel
              </>
            ) : (
              <>
                <Plus className="w-4 h-4" />
                Add New
              </>
            )}
          </button>
        </div>

        {isAddingNew && (
          <div className="mb-8 p-4 border border-gray-200 dark:border-[#222F43] rounded-lg">
            <h3 className="text-md font-medium text-[#101010] dark:text-[#94A9C9] mb-4">
              Add New Work Experience
            </h3>
            <ExperienceForm
              mode="create"
              onSuccess={() => setIsAddingNew(false)}
              onCancel={() => setIsAddingNew(false)}
            />
          </div>
        )}

        {experienceItems === undefined ? (
          <div className="flex justify-center py-8">
            <Loader2 className="w-8 h-8 text-[#ffe400] animate-spin" />
          </div>
        ) : experienceItems.length === 0 ? (
          <div className="text-center py-8 text-gray-500 dark:text-[#66768f]">
            No work experience items found. Add your first one!
          </div>
        ) : (
          <div className="space-y-6">
            {experienceItems.map((item, index) => (
              <div 
                key={item._id.toString()}
                className="border border-gray-100 dark:border-[#222F43] rounded-lg overflow-hidden"
              >
                {editingId === item._id ? (
                  <div className="p-4">
                    <ExperienceForm
                      mode="edit"
                      initialData={item}
                      onSuccess={() => setEditingId(null)}
                      onCancel={() => setEditingId(null)}
                    />
                  </div>
                ) : (
                  <div className="p-4">
                    <div className="flex justify-between items-start">
                      <div>
                        <div className="flex items-center gap-2 text-sm text-gray-500 dark:text-[#66768f] mb-1">
                          <span>{item.year}</span>
                        </div>
                        <h3 className="text-lg font-semibold text-[#101010] dark:text-[#94A9C9]">
                          {item.title}
                        </h3>
                        <p className="text-gray-600 dark:text-[#66768f] mb-2">
                          {item.company}
                        </p>
                        <p className="text-gray-600 dark:text-[#66768f] mb-3">
                          {item.description}
                        </p>
                        
                        {item.achievements.length > 0 && (
                          <div className="mt-2">
                            <h4 className="text-sm font-medium text-gray-700 dark:text-[#94A9C9] mb-1">
                              Achievements:
                            </h4>
                            <ul className="list-disc pl-5 space-y-1">
                              {item.achievements.map((achievement, i) => (
                                <li key={i} className="text-sm text-gray-600 dark:text-[#66768f]">
                                  {achievement}
                                </li>
                              ))}
                            </ul>
                          </div>
                        )}
                      </div>
                      
                      <div className="flex items-center space-x-1">
                        <button
                          onClick={() => handleMoveUp(index)}
                          disabled={index === 0}
                          className="p-1 text-gray-500 hover:text-[#ffe400] disabled:opacity-30 disabled:hover:text-gray-500"
                          title="Move up"
                        >
                          <MoveUp className="w-4 h-4" />
                        </button>
                        <button
                          onClick={() => handleMoveDown(index)}
                          disabled={index === experienceItems.length - 1}
                          className="p-1 text-gray-500 hover:text-[#ffe400] disabled:opacity-30 disabled:hover:text-gray-500"
                          title="Move down"
                        >
                          <MoveDown className="w-4 h-4" />
                        </button>
                        <button
                          onClick={() => setEditingId(item._id)}
                          className="p-1 text-gray-500 hover:text-[#ffe400]"
                          title="Edit"
                        >
                          <Edit className="w-4 h-4" />
                        </button>
                        <button
                          onClick={() => handleDelete(item._id)}
                          disabled={isDeleting === item._id}
                          className="p-1 text-gray-500 hover:text-red-500"
                          title="Delete"
                        >
                          {isDeleting === item._id ? (
                            <Loader2 className="w-4 h-4 animate-spin" />
                          ) : (
                            <Trash2 className="w-4 h-4" />
                          )}
                        </button>
                      </div>
                    </div>
                  </div>
                )}
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
} 