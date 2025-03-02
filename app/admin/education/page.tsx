"use client";

import { useState } from "react";
import { useQuery, useMutation } from "convex/react";
import { api } from "@/convex/_generated/api";
import { Id } from "@/convex/_generated/dataModel";
import { Loader2, Plus, Edit, Trash2, GraduationCap, MoveUp, MoveDown, X, Award } from "lucide-react";
import EducationForm from "@/components/Admin/EducationForm";

export default function EducationPage() {
  const educationItems = useQuery(api.education.getAll);
  const deleteEducation = useMutation(api.education.remove);
  const reorderEducation = useMutation(api.education.reorder);
  
  const [isAddingNew, setIsAddingNew] = useState(false);
  const [editingId, setEditingId] = useState<Id<"education"> | null>(null);
  const [isDeleting, setIsDeleting] = useState<Id<"education"> | null>(null);
  const [error, setError] = useState<string | null>(null);

  const handleDelete = async (id: Id<"education">) => {
    setError(null);
    setIsDeleting(id);
    
    try {
      await deleteEducation({ id });
    } catch (err) {
      setError((err as Error).message);
    } finally {
      setIsDeleting(null);
    }
  };

  const handleMoveUp = async (index: number) => {
    if (index <= 0 || !educationItems) return;
    
    const newOrder = [...educationItems];
    [newOrder[index - 1], newOrder[index]] = [newOrder[index], newOrder[index - 1]];
    
    try {
      await reorderEducation({ 
        orderedIds: newOrder.map(item => item._id) 
      });
    } catch (err) {
      setError((err as Error).message);
    }
  };

  const handleMoveDown = async (index: number) => {
    if (!educationItems || index >= educationItems.length - 1) return;
    
    const newOrder = [...educationItems];
    [newOrder[index], newOrder[index + 1]] = [newOrder[index + 1], newOrder[index]];
    
    try {
      await reorderEducation({ 
        orderedIds: newOrder.map(item => item._id) 
      });
    } catch (err) {
      setError((err as Error).message);
    }
  };

  // Helper function to render the appropriate icon
  const renderIcon = (iconName: string) => {
    switch (iconName) {
      case "graduation-cap":
        return <GraduationCap className="w-4 h-4" />;
      case "award":
        return <Award className="w-4 h-4" />;
      default:
        return <GraduationCap className="w-4 h-4" />;
    }
  };

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-[#101010] dark:text-[#94A9C9]">
          Education & Certifications Management
        </h1>
        <p className="text-gray-600 dark:text-[#66768f] mt-1">
          Manage your education history and certifications
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
            <GraduationCap className="w-5 h-5 text-[#ffe400]" />
            Education & Certifications
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
              Add New Education or Certification
            </h3>
            <EducationForm
              mode="create"
              onSuccess={() => setIsAddingNew(false)}
              onCancel={() => setIsAddingNew(false)}
            />
          </div>
        )}

        {educationItems === undefined ? (
          <div className="flex justify-center py-8">
            <Loader2 className="w-8 h-8 text-[#ffe400] animate-spin" />
          </div>
        ) : educationItems.length === 0 ? (
          <div className="text-center py-8 text-gray-500 dark:text-[#66768f]">
            No education or certification items found. Add your first one!
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b border-gray-200 dark:border-[#222F43]">
                  <th className="px-4 py-3 text-left text-sm font-medium text-gray-500 dark:text-[#66768f]">
                    Type
                  </th>
                  <th className="px-4 py-3 text-left text-sm font-medium text-gray-500 dark:text-[#66768f]">
                    Title
                  </th>
                  <th className="px-4 py-3 text-left text-sm font-medium text-gray-500 dark:text-[#66768f]">
                    Institution
                  </th>
                  <th className="px-4 py-3 text-left text-sm font-medium text-gray-500 dark:text-[#66768f]">
                    Year
                  </th>
                  <th className="px-4 py-3 text-right text-sm font-medium text-gray-500 dark:text-[#66768f]">
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody>
                {educationItems.map((item, index) => (
                  <tr
                    key={item._id.toString()}
                    className="border-b border-gray-100 dark:border-[#222F43] hover:bg-gray-50 dark:hover:bg-[#1a2539]"
                  >
                    {editingId === item._id ? (
                      <td colSpan={5} className="px-4 py-4">
                        <EducationForm
                          mode="edit"
                          initialData={item}
                          onSuccess={() => setEditingId(null)}
                          onCancel={() => setEditingId(null)}
                        />
                      </td>
                    ) : (
                      <>
                        <td className="px-4 py-4">
                          <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-100 text-blue-800 dark:bg-blue-900/30 dark:text-blue-300">
                            {item.type === "education" ? "Education" : "Certification"}
                          </span>
                        </td>
                        <td className="px-4 py-4 font-medium text-[#101010] dark:text-[#94A9C9]">
                          {item.title}
                        </td>
                        <td className="px-4 py-4 text-gray-600 dark:text-[#66768f]">
                          {item.institution}
                        </td>
                        <td className="px-4 py-4 text-gray-600 dark:text-[#66768f]">
                          {item.year}
                        </td>
                        <td className="px-4 py-4 text-right">
                          <div className="flex justify-end items-center space-x-2">
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
                              disabled={index === educationItems.length - 1}
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
                        </td>
                      </>
                    )}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
} 