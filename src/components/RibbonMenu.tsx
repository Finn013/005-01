import React, { useRef } from 'react';
import { 
  Bold, 
  Italic, 
  Underline, 
  AlignLeft, 
  AlignCenter, 
  AlignRight, 
  List, 
  ListOrdered, 
  Link, 
  Table, 
  Save, 
  Undo, 
  Redo,
  Type,
  Palette,
  Image,
  FileText,
  Download,
  Share2,
  Upload,
  FolderOpen
} from 'lucide-react';

interface RibbonMenuProps {
  onFormatText: (command: string, value?: string) => void;
  onSave: () => void;
  onSaveAsTxt: () => void;
  onShareAsJson: () => void;
  onImportJson: (jsonString: string) => void;
  onInsertTable: () => void;
  onInsertLink: () => void;
  onInsertImage: () => void;
  onInsertLocalImage: (dataUrl: string) => void;
}

export const RibbonMenu: React.FC<RibbonMenuProps> = ({
  onFormatText,
  onSave,
  onSaveAsTxt,
  onShareAsJson,
  onImportJson,
  onInsertTable,
  onInsertLink,
  onInsertImage,
  onInsertLocalImage,
}) => {
  const colorInputRef = useRef<HTMLInputElement>(null);
  const fontSizeRef = useRef<HTMLSelectElement>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const jsonInputRef = useRef<HTMLInputElement>(null);

  const handleColorChange = () => {
    if (colorInputRef.current) {
      onFormatText('foreColor', colorInputRef.current.value);
    }
  };

  const handleFontSizeChange = () => {
    if (fontSizeRef.current) {
      onFormatText('fontSize', fontSizeRef.current.value);
    }
  };

  const handleLocalImageUpload = () => {
    if (fileInputRef.current) {
      fileInputRef.current.click();
    }
  };

  const handleJsonImport = () => {
    if (jsonInputRef.current) {
      jsonInputRef.current.click();
    }
  };

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file && file.type.startsWith('image/')) {
      const reader = new FileReader();
      reader.onload = (e) => {
        const dataUrl = e.target?.result as string;
        onInsertLocalImage(dataUrl);
      };
      reader.readAsDataURL(file);
    }
    // Сбрасываем значение input для возможности повторного выбора того же файла
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
  };

  const handleJsonFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file && file.type === 'application/json') {
      const reader = new FileReader();
      reader.onload = (e) => {
        const jsonString = e.target?.result as string;
        onImportJson(jsonString);
      };
      reader.readAsText(file);
    } else if (file) {
      alert('Пожалуйста, выберите файл в формате JSON.');
    }
    // Сбрасываем значение input для возможности повторного выбора того же файла
    if (jsonInputRef.current) {
      jsonInputRef.current.value = '';
    }
  };

  return (
    <div className="bg-white border-b border-gray-300 shadow-sm">
      {/* Скрытые input для загрузки файлов */}
      <input
        ref={fileInputRef}
        type="file"
        accept="image/*"
        onChange={handleFileChange}
        className="hidden"
      />
      <input
        ref={jsonInputRef}
        type="file"
        accept=".json,application/json"
        onChange={handleJsonFileChange}
        className="hidden"
      />
      
      {/* Главная панель инструментов */}
      <div className="px-4 py-2">
        <div className="flex flex-wrap items-center gap-1">
          {/* Группа: Файл */}
          <div className="flex items-center gap-1 mr-4 border-r border-gray-300 pr-4">
            <button
              onClick={onSave}
              className="flex items-center gap-2 px-3 py-2 text-sm font-medium text-green-700 
                       hover:bg-green-50 hover:text-green-800 rounded-md transition-colors"
              title="Сохранить HTML (Ctrl+S)"
            >
              <Save size={16} />
              <span className="hidden sm:inline">HTML</span>
            </button>
            <button
              onClick={onSaveAsTxt}
              className="flex items-center gap-2 px-3 py-2 text-sm font-medium text-blue-700 
                       hover:bg-blue-50 hover:text-blue-800 rounded-md transition-colors"
              title="Сохранить как TXT"
            >
              <FileText size={16} />
              <span className="hidden sm:inline">TXT</span>
            </button>
            <button
              onClick={onShareAsJson}
              className="flex items-center gap-2 px-3 py-2 text-sm font-medium text-purple-700 
                       hover:bg-purple-50 hover:text-purple-800 rounded-md transition-colors"
              title="Экспорт в JSON"
            >
              <Share2 size={16} />
              <span className="hidden sm:inline">JSON</span>
            </button>
            <button
              onClick={handleJsonImport}
              className="flex items-center gap-2 px-3 py-2 text-sm font-medium text-pink-700 
                       hover:bg-pink-50 hover:text-pink-800 rounded-md transition-colors"
              title="Импорт из JSON"
            >
              <FolderOpen size={16} />
              <span className="hidden sm:inline">Импорт</span>
            </button>
          </div>

          {/* Группа: Отмена/Повтор */}
          <div className="flex items-center gap-1 mr-4 border-r border-gray-300 pr-4">
            <button
              onClick={() => onFormatText('undo')}
              className="p-2 text-orange-700 hover:bg-orange-50 hover:text-orange-800 rounded-md transition-colors"
              title="Отменить (Ctrl+Z)"
            >
              <Undo size={16} />
            </button>
            <button
              onClick={() => onFormatText('redo')}
              className="p-2 text-orange-700 hover:bg-orange-50 hover:text-orange-800 rounded-md transition-colors"
              title="Повторить (Ctrl+Y)"
            >
              <Redo size={16} />
            </button>
          </div>

          {/* Группа: Шрифт */}
          <div className="flex items-center gap-1 mr-4 border-r border-gray-300 pr-4">
            <select
              ref={fontSizeRef}
              onChange={handleFontSizeChange}
              className="px-2 py-1 text-sm border border-indigo-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500 text-indigo-700"
              title="Размер шрифта"
            >
              <option value="1">8pt</option>
              <option value="2">10pt</option>
              <option value="3" selected>12pt</option>
              <option value="4">14pt</option>
              <option value="5">18pt</option>
              <option value="6">24pt</option>
              <option value="7">36pt</option>
            </select>
            
            <div className="relative">
              <button
                onClick={() => colorInputRef.current?.click()}
                className="p-2 text-indigo-700 hover:bg-indigo-50 hover:text-indigo-800 rounded-md transition-colors"
                title="Цвет текста"
              >
                <Palette size={16} />
              </button>
              <input
                ref={colorInputRef}
                type="color"
                onChange={handleColorChange}
                className="absolute opacity-0 w-0 h-0"
                defaultValue="#000000"
              />
            </div>
          </div>

          {/* Группа: Форматирование */}
          <div className="flex items-center gap-1 mr-4 border-r border-gray-300 pr-4">
            <button
              onClick={() => onFormatText('bold')}
              className="p-2 text-red-700 hover:bg-red-50 hover:text-red-800 rounded-md transition-colors"
              title="Жирный (Ctrl+B)"
            >
              <Bold size={16} />
            </button>
            <button
              onClick={() => onFormatText('italic')}
              className="p-2 text-red-700 hover:bg-red-50 hover:text-red-800 rounded-md transition-colors"
              title="Курсив (Ctrl+I)"
            >
              <Italic size={16} />
            </button>
            <button
              onClick={() => onFormatText('underline')}
              className="p-2 text-red-700 hover:bg-red-50 hover:text-red-800 rounded-md transition-colors"
              title="Подчеркнутый (Ctrl+U)"
            >
              <Underline size={16} />
            </button>
          </div>

          {/* Группа: Выравнивание */}
          <div className="flex items-center gap-1 mr-4 border-r border-gray-300 pr-4">
            <button
              onClick={() => onFormatText('justifyLeft')}
              className="p-2 text-teal-700 hover:bg-teal-50 hover:text-teal-800 rounded-md transition-colors"
              title="По левому краю"
            >
              <AlignLeft size={16} />
            </button>
            <button
              onClick={() => onFormatText('justifyCenter')}
              className="p-2 text-teal-700 hover:bg-teal-50 hover:text-teal-800 rounded-md transition-colors"
              title="По центру"
            >
              <AlignCenter size={16} />
            </button>
            <button
              onClick={() => onFormatText('justifyRight')}
              className="p-2 text-teal-700 hover:bg-teal-50 hover:text-teal-800 rounded-md transition-colors"
              title="По правому краю"
            >
              <AlignRight size={16} />
            </button>
          </div>

          {/* Группа: Списки */}
          <div className="flex items-center gap-1 mr-4 border-r border-gray-300 pr-4">
            <button
              onClick={() => onFormatText('insertUnorderedList')}
              className="p-2 text-amber-700 hover:bg-amber-50 hover:text-amber-800 rounded-md transition-colors"
              title="Маркированный список"
            >
              <List size={16} />
            </button>
            <button
              onClick={() => onFormatText('insertOrderedList')}
              className="p-2 text-amber-700 hover:bg-amber-50 hover:text-amber-800 rounded-md transition-colors"
              title="Нумерованный список"
            >
              <ListOrdered size={16} />
            </button>
          </div>

          {/* Группа: Вставка */}
          <div className="flex items-center gap-1">
            <button
              onClick={onInsertLink}
              className="flex items-center gap-1 px-2 py-2 text-cyan-700 hover:bg-cyan-50 hover:text-cyan-800 rounded-md transition-colors"
              title="Вставить ссылку"
            >
              <Link size={16} />
              <span className="hidden md:inline text-sm">Ссылка</span>
            </button>
            <button
              onClick={onInsertTable}
              className="flex items-center gap-1 px-2 py-2 text-cyan-700 hover:bg-cyan-50 hover:text-cyan-800 rounded-md transition-colors"
              title="Вставить таблицу"
            >
              <Table size={16} />
              <span className="hidden md:inline text-sm">Таблица</span>
            </button>
            <button
              onClick={onInsertImage}
              className="flex items-center gap-1 px-2 py-2 text-cyan-700 hover:bg-cyan-50 hover:text-cyan-800 rounded-md transition-colors"
              title="Вставить изображение по URL"
            >
              <Image size={16} />
              <span className="hidden md:inline text-sm">URL</span>
            </button>
            <button
              onClick={handleLocalImageUpload}
              className="flex items-center gap-1 px-2 py-2 text-emerald-700 hover:bg-emerald-50 hover:text-emerald-800 rounded-md transition-colors"
              title="Загрузить изображение с устройства"
            >
              <Upload size={16} />
              <span className="hidden md:inline text-sm">Файл</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};