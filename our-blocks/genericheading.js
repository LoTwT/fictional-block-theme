import { registerBlockType } from "@wordpress/blocks"
import { RichText, BlockControls } from "@wordpress/block-editor"
import { ToolbarGroup, ToolbarButton } from "@wordpress/components"

registerBlockType("ourblocktheme/genericheading", {
  title: "Generic Heading",
  attributes: {
    text: {
      type: "string",
    },
    size: {
      type: "string",
      default: "large",
    },
  },
  edit: EditComponent,
  save: SaveComponent,
})

function EditComponent(props) {
  const handleTextChange = (x) => props.setAttributes({ text: x })

  return (
    <>
      {/* 菜单栏扩展 */}
      <BlockControls>
        <ToolbarGroup>
          <ToolbarButton
            isPressed={props.attributes.size === "large"}
            onClick={() => props.setAttributes({ size: "large" })}
          >
            Large
          </ToolbarButton>
          <ToolbarButton
            isPressed={props.attributes.size === "medium"}
            onClick={() => props.setAttributes({ size: "medium" })}
          >
            Medium
          </ToolbarButton>
          <ToolbarButton
            isPressed={props.attributes.size === "small"}
            onClick={() => props.setAttributes({ size: "small" })}
          >
            Small
          </ToolbarButton>
        </ToolbarGroup>
      </BlockControls>

      {/* 富文本 */}
      <RichText
        tagName="h1"
        className={`headline headline--${props.attributes.size}`}
        // 编辑器菜单允许的操作
        allowedFormats={["core/bold", "core/italic"]}
        value={props.attributes.text}
        onChange={handleTextChange}
      />
    </>
  )
}

function SaveComponent(props) {
  const createTagName = () => {
    switch (props.attributes.size) {
      case "large":
        return "h1"
      case "medium":
        return "h2"
      case "small":
        return "h3"
      default:
        return "h1"
    }
  }

  return (
    <RichText.Content
      tagName={createTagName()}
      value={props.attributes.text}
      className={`headline headline--${props.attributes.size}`}
    />
  )
}
