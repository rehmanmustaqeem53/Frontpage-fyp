import { useEditor, EditorContent } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import Underline from "@tiptap/extension-underline";
import TextAlign from "@tiptap/extension-text-align";

export default function TiptapEditor({ content, onChange }) {
  const editor = useEditor({
    extensions: [
      StarterKit,
      Underline,
      TextAlign.configure({
        types: ["heading", "paragraph"],
      }),
    ],
    content,
    onUpdate: ({ editor }) => {
      onChange(editor.getHTML());
    },
  });

  if (!editor) return null;

  return (
    <div className="border rounded p-3 bg-white dark:bg-gray-800">
      {/* Toolbar */}
      <div className="flex flex-wrap gap-2 mb-3">
        {/* Bold */}
        <button
          onClick={() => editor.chain().focus().toggleBold().run()}
          className={`px-3 py-1 rounded ${
            editor.isActive("bold")
              ? "bg-blue-600 text-white dark:bg-blue-400 dark:text-black"
              : "bg-gray-200 dark:bg-gray-700 dark:text-white"
          }`}
        >
          Bold
        </button>

        {/* Italic */}
        <button
          onClick={() => editor.chain().focus().toggleItalic().run()}
          className={`px-3 py-1 rounded ${
            editor.isActive("italic")
              ? "bg-blue-600 text-white dark:bg-blue-400 dark:text-black"
              : "bg-gray-200 dark:bg-gray-700 dark:text-white"
          }`}
        >
          Italic
        </button>

        {/* Underline */}
        <button
          onClick={() => editor.chain().focus().toggleUnderline().run()}
          className={`px-3 py-1 rounded ${
            editor.isActive("underline")
              ? "bg-blue-600 text-white dark:bg-blue-400 dark:text-black"
              : "bg-gray-200 dark:bg-gray-700 dark:text-white"
          }`}
        >
          Underline
        </button>

        {/* H1 */}
        <button
          onClick={() =>
            editor.chain().focus().toggleHeading({ level: 1 }).run()
          }
          className={`px-3 py-1 rounded ${
            editor.isActive("heading", { level: 1 })
              ? "bg-blue-600 text-white dark:bg-blue-400 dark:text-black"
              : "bg-gray-200 dark:bg-gray-700 dark:text-white"
          }`}
        >
          H1
        </button>

        {/* H2 */}
        <button
          onClick={() =>
            editor.chain().focus().toggleHeading({ level: 2 }).run()
          }
          className={`px-3 py-1 rounded ${
            editor.isActive("heading", { level: 2 })
              ? "bg-blue-600 text-white dark:bg-blue-400 dark:text-black"
              : "bg-gray-200 dark:bg-gray-700 dark:text-white"
          }`}
        >
          H2
        </button>

        {/* Bullet list */}
        <button
          onClick={() => editor.chain().focus().toggleBulletList().run()}
          className={`px-3 py-1 rounded ${
            editor.isActive("bulletList")
              ? "bg-blue-600 text-white dark:bg-blue-400 dark:text-black"
              : "bg-gray-200 dark:bg-gray-700 dark:text-white"
          }`}
        >
          • Bullet
        </button>

        {/* Number list */}
        <button
          onClick={() => editor.chain().focus().toggleOrderedList().run()}
          className={`px-3 py-1 rounded ${
            editor.isActive("orderedList")
              ? "bg-blue-600 text-white dark:bg-blue-400 dark:text-black"
              : "bg-gray-200 dark:bg-gray-700 dark:text-white"
          }`}
        >
          1. List
        </button>

        {/* Align */}
        <button
          onClick={() => editor.chain().focus().setTextAlign("left").run()}
          className="px-3 py-1 rounded bg-gray-200 dark:bg-gray-700 dark:text-white"
        >
          Left
        </button>

        <button
          onClick={() => editor.chain().focus().setTextAlign("center").run()}
          className="px-3 py-1 rounded bg-gray-200 dark:bg-gray-700 dark:text-white"
        >
          Center
        </button>

        <button
          onClick={() => editor.chain().focus().setTextAlign("right").run()}
          className="px-3 py-1 rounded bg-gray-200 dark:bg-gray-700 dark:text-white"
        >
          Right
        </button>
      </div>

      {/* Editor Content */}
      <EditorContent
        editor={editor}
        className="min-h-[150px] bg-white dark:bg-gray-800 text-black dark:text-white [&_ul]:list-disc [&_ul]:ml-6 [&_ol]:list-decimal [&_ol]:ml-6 [&_li]:ml-2 prose dark:prose-invert"
      />
    </div>
  );
}

