import Underline from '@tiptap/extension-underline';
import { EditorContent, useEditor } from '@tiptap/react';
import StarterKit from '@tiptap/starter-kit';
import Toolbar from './toolbar';

function Tiptap(props) {
    const { description, onChange, error } = props;
    const editor = useEditor({
        extensions: [
            StarterKit.configure({
                bulletList: {
                    keepMarks: true,
                    keepAttributes: true,
                    HTMLAttributes: {
                        class: 'list-disc pl-4',
                    },
                },
                orderedList: {
                    keepAttributes: true,
                    keepMarks: true,
                    HTMLAttributes: {
                        class: 'list-decimal pl-8',
                    },
                },
                heading: {
                    HTMLAttributes: {
                        class: 'text-xl font-bold',
                        level: 1,
                    },
                },
            }),
            Underline,
        ],
        content: description,
        editorProps: {
            attributes: {
                class: `rounded-md border min-h-[150px] bg-background px-3 py-2 ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 border-input`,
            },
        },
        onUpdate({ editor }) {
            onChange(editor.getHTML());
            console.log(editor.getHTML());
        },
    });

    return (
        <div className='flex  flex-col justify-stretch gap-2'>
            <Toolbar editor={editor} content={description} />
            <EditorContent editor={editor} />
        </div>
    );
}

export default Tiptap;
