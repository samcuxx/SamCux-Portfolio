"use client";

import { useState } from "react";
import { useQuery, useMutation } from "convex/react";
import { api } from "@/convex/_generated/api";
import { Id } from "@/convex/_generated/dataModel";
import { Loader2, Plus, Edit, Trash2, Code2, MoveUp, MoveDown, X } from "lucide-react";
import TechStackForm from "@/components/Admin/TechStackForm";

export default function TechStackPage() {
  const techStacks = useQuery(api.techStacks.getAll);
  const deleteTechStack = useMutation(api.techStacks.remove);
  const reorderTechStacks = useMutation(api.techStacks.reorder);
  
  const [isAddingNew, setIsAddingNew] = useState(false);
  const [editingId, setEditingId] = useState<Id<"techStacks"> | null>(null);
  const [isDeleting, setIsDeleting] = useState<Id<"techStacks"> | null>(null);
  const [error, setError] = useState<string | null>(null);

  const handleDelete = async (id: Id<"techStacks">) => {
    setError(null);
    setIsDeleting(id);
    
    try {
      await deleteTechStack({ id });
    } catch (err) {
      setError((err as Error).message);
    } finally {
      setIsDeleting(null);
    }
  };

  const handleMoveUp = async (index: number) => {
    if (index <= 0 || !techStacks) return;
    
    const newOrder = [...techStacks];
    [newOrder[index - 1], newOrder[index]] = [newOrder[index], newOrder[index - 1]];
    
    try {
      await reorderTechStacks({ 
        orderedIds: newOrder.map(item => item._id) 
      });
    } catch (err) {
      setError((err as Error).message);
    }
  };

  const handleMoveDown = async (index: number) => {
    if (!techStacks || index >= techStacks.length - 1) return;
    
    const newOrder = [...techStacks];
    [newOrder[index], newOrder[index + 1]] = [newOrder[index + 1], newOrder[index]];
    
    try {
      await reorderTechStacks({ 
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
          Tech Stack Management
        </h1>
        <p className="text-gray-600 dark:text-[#66768f] mt-1">
          Manage the technologies displayed in your portfolio
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
            <Code2 className="w-5 h-5 text-[#ffe400]" />
            Tech Stack Items
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
              Add New Tech Stack Item
            </h3>
            <TechStackForm
              mode="create"
              onSuccess={() => setIsAddingNew(false)}
              onCancel={() => setIsAddingNew(false)}
            />
          </div>
        )}

        {techStacks === undefined ? (
          <div className="flex justify-center py-8">
            <Loader2 className="w-8 h-8 text-[#ffe400] animate-spin" />
          </div>
        ) : techStacks.length === 0 ? (
          <div className="text-center py-8 text-gray-500 dark:text-[#66768f]">
            No tech stack items found. Add your first one!
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b border-gray-200 dark:border-[#222F43]">
                  <th className="px-4 py-3 text-left text-sm font-medium text-gray-500 dark:text-[#66768f]">
                    Icon
                  </th>
                  <th className="px-4 py-3 text-left text-sm font-medium text-gray-500 dark:text-[#66768f]">
                    Name
                  </th>
                  <th className="px-4 py-3 text-left text-sm font-medium text-gray-500 dark:text-[#66768f]">
                    Category
                  </th>
                  <th className="px-4 py-3 text-right text-sm font-medium text-gray-500 dark:text-[#66768f]">
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody>
                {techStacks.map((tech, index) => (
                  <tr
                    key={tech._id.toString()}
                    className="border-b border-gray-100 dark:border-[#222F43] hover:bg-gray-50 dark:hover:bg-[#1a2539]"
                  >
                    {editingId === tech._id ? (
                      <td colSpan={4} className="px-4 py-4">
                        <TechStackForm
                          mode="edit"
                          initialData={tech}
                          onSuccess={() => setEditingId(null)}
                          onCancel={() => setEditingId(null)}
                        />
                      </td>
                    ) : (
                      <>
                        <td className="px-4 py-4 text-2xl">{tech.icon}</td>
                        <td className="px-4 py-4 font-medium text-[#101010] dark:text-[#94A9C9]">
                          {tech.name}
                        </td>
                        <td className="px-4 py-4 text-gray-600 dark:text-[#66768f]">
                          {tech.category || "-"}
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
                              disabled={index === techStacks.length - 1}
                              className="p-1 text-gray-500 hover:text-[#ffe400] disabled:opacity-30 disabled:hover:text-gray-500"
                              title="Move down"
                            >
                              <MoveDown className="w-4 h-4" />
                            </button>
                            <button
                              onClick={() => setEditingId(tech._id)}
                              className="p-1 text-gray-500 hover:text-[#ffe400]"
                              title="Edit"
                            >
                              <Edit className="w-4 h-4" />
                            </button>
                            <button
                              onClick={() => handleDelete(tech._id)}
                              disabled={isDeleting === tech._id}
                              className="p-1 text-gray-500 hover:text-red-500"
                              title="Delete"
                            >
                              {isDeleting === tech._id ? (
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