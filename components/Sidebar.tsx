import React from 'react';
import { DocSection } from '../types';
import { BookOpen, FileText, ChevronRight, Upload, Download } from 'lucide-react';

interface SidebarProps {
  sections: DocSection[];
  activeSectionId: string;
  onSelectSection: (id: string) => void;
  fileName: string;
  isOpen: boolean;
  onCloseMobile: () => void;
  onReset: () => void;
  onDownload: () => void;
}

const Sidebar: React.FC<SidebarProps> = ({ 
  sections, 
  activeSectionId, 
  onSelectSection, 
  fileName,
  isOpen,
  onCloseMobile,
  onReset,
  onDownload
}) => {
  return (
    <aside 
      className="h-full bg-[#0f172a] shadow-xl flex flex-col"
    >
      <div className="flex flex-col h-full">
        {/* Header */}
        <div className="p-8 border-b border-slate-800 bg-[#0f172a]">
          <div className="flex items-center gap-3 text-slate-100">
            <FileText size={28} className="text-[#5ABDAC] flex-shrink-0" />
            <h1 className="font-bold text-2xl tracking-tight leading-tight break-words">{fileName}</h1>
          </div>
        </div>

        {/* Navigation List */}
        <nav className="flex-1 overflow-y-auto custom-scrollbar p-6">
          <ul className="space-y-1">
            {sections.map((section) => {
              const isActive = section.id === activeSectionId;
              return (
                <li key={section.id}>
                  <button
                    onClick={() => {
                      onSelectSection(section.id);
                      onCloseMobile();
                    }}
                    className={`
                      w-full text-left px-5 py-3 rounded-xl text-lg transition-all duration-200 group flex items-center justify-between
                      ${isActive 
                        ? 'bg-[#5ABDAC]/10 text-[#5ABDAC] font-medium ring-1 ring-[#5ABDAC]/30' 
                        : 'text-slate-400 hover:bg-slate-800 hover:text-slate-200'
                      }
                    `}
                  >
                    <span className="truncate">{section.title || "Untitled Section"}</span>
                    {isActive && <ChevronRight size={18} className="text-[#5ABDAC]" />}
                  </button>
                </li>
              );
            })}
          </ul>
        </nav>

        {/* Footer */}
        <div className="p-6 border-t border-slate-800 bg-[#0f172a] space-y-3">
            <button 
              onClick={onDownload}
              className="w-full flex items-center justify-center gap-2 px-4 py-3 bg-[#5ABDAC] hover:bg-[#4AA89C] text-[#0f172a] rounded-xl text-sm font-bold transition-all shadow-lg shadow-[#5ABDAC]/10"
            >
              <Download size={16} />
              Export HTML
            </button>
            <button 
              onClick={onReset}
              className="w-full flex items-center justify-center gap-2 px-4 py-3 bg-slate-800 hover:bg-slate-700 text-slate-300 rounded-xl text-sm font-medium transition-colors"
            >
              <Upload size={16} />
              Open New File
            </button>
        </div>
      </div>
    </aside>
  );
};

export default Sidebar;