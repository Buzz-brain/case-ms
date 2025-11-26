import React, { createContext, useContext, useState, ReactNode } from 'react';
import { mockCases, mockCategories, mockComments, Case, Category, Comment } from '@/mock/cases';
import { toast } from '@/hooks/use-toast';

interface CasesContextType {
  cases: Case[];
  categories: Category[];
  comments: Comment[];
  addCase: (caseData: Omit<Case, 'id' | 'createdAt' | 'updatedAt'>) => void;
  updateCase: (id: string, caseData: Partial<Case>) => void;
  deleteCase: (id: string) => void;
  addCategory: (categoryData: Omit<Category, 'id'>) => void;
  updateCategory: (id: string, categoryData: Partial<Category>) => void;
  deleteCategory: (id: string) => void;
  addComment: (caseId: string, username: string, email: string, comment: string, parentCommentId?: string) => void;
  getCaseById: (id: string) => Case | undefined;
  getCasesByCategory: (category: string) => Case[];
  getCommentsByCaseId: (caseId: string) => Comment[];
}

const CasesContext = createContext<CasesContextType | undefined>(undefined);

export const CasesProvider = ({ children }: { children: ReactNode }) => {
  const [cases, setCases] = useState<Case[]>(mockCases);
  const [categories, setCategories] = useState<Category[]>(mockCategories);
  const [comments, setComments] = useState<Comment[]>(mockComments);

  const addCase = (caseData: Omit<Case, 'id' | 'createdAt' | 'updatedAt'>) => {
    const newCase: Case = {
      ...caseData,
      id: Math.random().toString(36).substr(2, 9),
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    };
    setCases([newCase, ...cases]);
    toast({
      title: 'Case created',
      description: 'The case has been successfully created.',
    });
  };

  const updateCase = (id: string, caseData: Partial<Case>) => {
    setCases(cases.map(c => 
      c.id === id 
        ? { ...c, ...caseData, updatedAt: new Date().toISOString() }
        : c
    ));
    toast({
      title: 'Case updated',
      description: 'The case has been successfully updated.',
    });
  };

  const deleteCase = (id: string) => {
    setCases(cases.filter(c => c.id !== id));
    toast({
      title: 'Case deleted',
      description: 'The case has been successfully deleted.',
    });
  };

  const addCategory = (categoryData: Omit<Category, 'id'>) => {
    const newCategory: Category = {
      ...categoryData,
      id: Math.random().toString(36).substr(2, 9),
    };
    setCategories([...categories, newCategory]);
    toast({
      title: 'Category created',
      description: 'The category has been successfully created.',
    });
  };

  const updateCategory = (id: string, categoryData: Partial<Category>) => {
    setCategories(categories.map(c => 
      c.id === id ? { ...c, ...categoryData } : c
    ));
    toast({
      title: 'Category updated',
      description: 'The category has been successfully updated.',
    });
  };

  const deleteCategory = (id: string) => {
    setCategories(categories.filter(c => c.id !== id));
    toast({
      title: 'Category deleted',
      description: 'The category has been successfully deleted.',
    });
  };

  const addComment = (
    caseId: string,
    username: string,
    email: string,
    comment: string,
    parentCommentId?: string
  ) => {
    const newComment: Comment = {
      id: Math.random().toString(36).substr(2, 9),
      caseId,
      username,
      email,
      comment,
      parentCommentId: parentCommentId || null,
      replies: [],
      createdAt: new Date().toISOString(),
    };

    if (parentCommentId) {
      // Add as a reply
      setComments(comments.map(c => {
        if (c.id === parentCommentId) {
          return { ...c, replies: [...c.replies, newComment] };
        }
        return c;
      }));
    } else {
      // Add as a top-level comment
      setComments([...comments, newComment]);
    }

    toast({
      title: 'Comment added',
      description: 'Your comment has been successfully posted.',
    });
  };

  const getCaseById = (id: string) => cases.find(c => c.id === id);
  
  const getCasesByCategory = (category: string) => 
    cases.filter(c => c.category === category);
  
  const getCommentsByCaseId = (caseId: string) => 
    comments.filter(c => c.caseId === caseId && !c.parentCommentId);

  return (
    <CasesContext.Provider value={{
      cases,
      categories,
      comments,
      addCase,
      updateCase,
      deleteCase,
      addCategory,
      updateCategory,
      deleteCategory,
      addComment,
      getCaseById,
      getCasesByCategory,
      getCommentsByCaseId,
    }}>
      {children}
    </CasesContext.Provider>
  );
};

export const useCases = () => {
  const context = useContext(CasesContext);
  if (context === undefined) {
    throw new Error('useCases must be used within a CasesProvider');
  }
  return context;
};
