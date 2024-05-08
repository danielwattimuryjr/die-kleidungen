import { Icon } from './icon';
import { Toggle } from './toggle';

function Toolbar(props) {
    const { editor } = props;

    if (!editor) {
        return null;
    }

    return (
        <div className='rounded-md border border-input bg-transparent'>
            <Toggle size='sm' pressed={editor.isActive('heading')} onPressedChange={() => editor.chain().focus().toggleHeading({ level: 2 }).run()}>
                <Icon icon={'IconHeading'} />
            </Toggle>

            <Toggle size='sm' pressed={editor.isActive('bold')} onPressedChange={() => editor.chain().focus().toggleBold().run()}>
                <Icon icon={'IconBold'} />
            </Toggle>

            <Toggle size='sm' pressed={editor.isActive('italic')} onPressedChange={() => editor.chain().focus().toggleItalic().run()}>
                <Icon icon={'IconItalic'} />
            </Toggle>

            <Toggle size='sm' pressed={editor.isActive('underline')} onPressedChange={() => editor.chain().focus().toggleUnderline().run()}>
                <Icon icon={'IconUnderline'} />
            </Toggle>

            <Toggle size='sm' pressed={editor.isActive('strike')} onPressedChange={() => editor.chain().focus().toggleStrike().run()}>
                <Icon icon={'IconStrikethrough'} />
            </Toggle>

            <Toggle size='sm' pressed={editor.isActive('bulletList')} onPressedChange={() => editor.chain().focus().toggleBulletList().run()}>
                <Icon icon={'IconList'} />
            </Toggle>

            <Toggle size='sm' pressed={editor.isActive('orderedList')} onPressedChange={() => editor.chain().focus().toggleOrderedList().run()}>
                <Icon icon={'IconListNumbers'} />
            </Toggle>
        </div>
    );
}

export default Toolbar;
