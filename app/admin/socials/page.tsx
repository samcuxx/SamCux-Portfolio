"use client";

import { useState } from "react";
import { useQuery, useMutation } from "convex/react";
import { api } from "@/convex/_generated/api";
import { Id } from "@/convex/_generated/dataModel";
import { Loader2, Plus, Edit, Trash2, Link2, MoveUp, MoveDown, X, ExternalLink } from "lucide-react";
import SocialLinkForm from "@/components/Admin/SocialLinkForm";
import * as Icons from "lucide-react";

export default function SocialsPage() {
  const socialLinks = useQuery(api.socials.getAll);
  const deleteSocialLink = useMutation(api.socials.remove);
  const reorderSocialLinks = useMutation(api.socials.reorder);
  
  const [isAddingNew, setIsAddingNew] = useState(false);
  const [editingId, setEditingId] = useState<Id<"socials"> | null>(null);
  const [isDeleting, setIsDeleting] = useState<Id<"socials"> | null>(null);
  const [error, setError] = useState<string | null>(null);

  const handleDelete = async (id: Id<"socials">) => {
    setError(null);
    setIsDeleting(id);
    
    try {
      await deleteSocialLink({ id });
    } catch (err) {
      setError((err as Error).message);
    } finally {
      setIsDeleting(null);
    }
  };

  const handleMoveUp = async (index: number) => {
    if (index <= 0 || !socialLinks) return;
    
    const newOrder = [...socialLinks];
    [newOrder[index - 1], newOrder[index]] = [newOrder[index], newOrder[index - 1]];
    
    try {
      await reorderSocialLinks({ 
        orderedIds: newOrder.map(item => item._id) 
      });
    } catch (err) {
      setError((err as Error).message);
    }
  };

  const handleMoveDown = async (index: number) => {
    if (!socialLinks || index >= socialLinks.length - 1) return;
    
    const newOrder = [...socialLinks];
    [newOrder[index], newOrder[index + 1]] = [newOrder[index + 1], newOrder[index]];
    
    try {
      await reorderSocialLinks({ 
        orderedIds: newOrder.map(item => item._id) 
      });
    } catch (err) {
      setError((err as Error).message);
    }
  };

  // Render the icon for a social link
  const renderSocialIcon = (iconName: string) => {
    // @ts-ignore - Dynamically access icon from Lucide
    const IconComponent = Icons[iconName];
    return IconComponent ? <IconComponent className="w-5 h-5" /> : <Link2 className="w-5 h-5" />;
  };

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-[#101010] dark:text-[#94A9C9]">
          Social Links Management
        </h1>
        <p className="text-gray-600 dark:text-[#66768f] mt-1">
          Manage your social media links and profiles
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
            <Link2 className="w-5 h-5 text-[#ffe400]" />
            Social Links
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
              Add New Social Link
            </h3>
            <SocialLinkForm
              mode="create"
              onSuccess={() => setIsAddingNew(false)}
              onCancel={() => setIsAddingNew(false)}
            />
          </div>
        )}

        {socialLinks === undefined ? (
          <div className="flex justify-center py-8">
            <Loader2 className="w-8 h-8 text-[#ffe400] animate-spin" />
          </div>
        ) : socialLinks.length === 0 ? (
          <div className="text-center py-8 text-gray-500 dark:text-[#66768f]">
            No social links found. Add your first one!
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b border-gray-200 dark:border-[#222F43]">
                  <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 dark:text-[#66768f] uppercase tracking-wider">
                    Platform
                  </th>
                  <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 dark:text-[#66768f] uppercase tracking-wider">
                    URL
                  </th>
                  <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 dark:text-[#66768f] uppercase tracking-wider">
                    Display
                  </th>
                  <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 dark:text-[#66768f] uppercase tracking-wider">
                    Status
                  </th>
                  <th className="px-4 py-3 text-right text-xs font-medium text-gray-500 dark:text-[#66768f] uppercase tracking-wider">
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200 dark:divide-[#222F43]">
                {socialLinks.map((item, index) => (
                  <tr key={item._id.toString()} className="hover:bg-gray-50 dark:hover:bg-[#222F43]">
                    {editingId === item._id ? (
                      <td colSpan={5} className="px-4 py-4">
                        <SocialLinkForm
                          mode="edit"
                          initialData={item}
                          onSuccess={() => setEditingId(null)}
                          onCancel={() => setEditingId(null)}
                        />
                      </td>
                    ) : (
                      <>
                        <td className="px-4 py-4 whitespace-nowrap">
                          <div className="flex items-center gap-2">
                            <span className="text-gray-500 dark:text-[#94A9C9]">
                              {renderSocialIcon(item.icon)}
                            </span>
                            <span className="text-gray-900 dark:text-[#94A9C9] font-medium">
                              {item.platform}
                            </span>
                          </div>
                        </td>
                        <td className="px-4 py-4 whitespace-nowrap">
                          <div className="flex items-center gap-2">
                            <a 
                              href={item.url} 
                              target="_blank" 
                              rel="noopener noreferrer"
                              className="text-blue-600 dark:text-blue-400 hover:underline flex items-center gap-1"
                            >
                              {item.url.length > 30 ? `${item.url.substring(0, 30)}...` : item.url}
                              <ExternalLink className="w-3 h-3" />
                            </a>
                          </div>
                        </td>
                        <td className="px-4 py-4 whitespace-nowrap">
                          <div className="flex flex-col gap-1 text-xs">
                            {item.showInHero && (
                              <span className="inline-flex items-center px-2 py-0.5 rounded text-xs font-medium bg-green-100 text-green-800 dark:bg-green-900/20 dark:text-green-400">
                                Hero
                              </span>
                            )}
                            {item.showInFooter && (
                              <span className="inline-flex items-center px-2 py-0.5 rounded text-xs font-medium bg-blue-100 text-blue-800 dark:bg-blue-900/20 dark:text-blue-400">
                                Footer
                              </span>
                            )}
                          </div>
                        </td>
                        <td className="px-4 py-4 whitespace-nowrap">
                          <span className={`inline-flex items-center px-2 py-0.5 rounded text-xs font-medium ${
                            item.isActive !== false
                              ? "bg-green-100 text-green-800 dark:bg-green-900/20 dark:text-green-400"
                              : "bg-gray-100 text-gray-800 dark:bg-gray-900/20 dark:text-gray-400"
                          }`}>
                            {item.isActive !== false ? "Active" : "Inactive"}
                          </span>
                        </td>
                        <td className="px-4 py-4 whitespace-nowrap text-right">
                          <div className="flex items-center justify-end space-x-2">
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
                              disabled={index === socialLinks.length - 1}
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