import { registerBlockType } from "@wordpress/blocks"
import {
  RichText,
  InspectorControls,
  BlockControls,
  __experimentalLinkControl as LinkControl,
  getColorObjectByColorValue,
} from "@wordpress/block-editor"
import {
  ToolbarGroup,
  ToolbarButton,
  Popover,
  Button,
  PanelBody,
  ColorPalette,
} from "@wordpress/components"
import { link } from "@wordpress/icons"
import { useState } from "@wordpress/element"
import { ourColors } from "../inc/ourColors"

registerBlockType("ourblocktheme/genericbutton", {
  title: "Generic Button",
  attributes: {
    text: {
      type: "string",
    },
    size: {
      type: "string",
      default: "large",
    },
    linkObject: { type: "object", default: { url: "" } },
    colorName: {
      type: "string",
      default: "blue",
    },
  },
  edit: EditComponent,
  save: SaveComponent,
})

function EditComponent(props) {
  const [isLinkPickerVisible, setIsLinkPickerVisible] = useState(false)

  const handleTextChange = (x) => props.setAttributes({ text: x })

  const buttonHandler = () => {
    setIsLinkPickerVisible(!isLinkPickerVisible)
  }

  const handleLinkChange = (newLink) => {
    props.setAttributes({ linkObject: newLink })
  }

  const currentColorValue = ourColors.filter(
    (color) => color.name === props.attributes.colorName
  )[0].color

  const handleColorChange = (colorCode) => {
    // colorCode 是组件返回的十六进制值，需要找到其对应的名称
    const { name } = getColorObjectByColorValue(ourColors, colorCode)
    props.setAttributes({ colorName: name })
  }

  return (
    <>
      {/* 菜单栏扩展 */}
      <BlockControls>
        {/* 设置按钮链接 */}
        <ToolbarGroup>
          <ToolbarButton onClick={buttonHandler} icon={link} />
        </ToolbarGroup>

        {/* 设置按钮字体大小 */}
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

      {/* 按钮调色板 */}
      <InspectorControls>
        <PanelBody title="Color" initialOpen={true}>
          <ColorPalette
            disableCustomColors={true}
            clearable={false}
            colors={ourColors}
            value={currentColorValue}
            onChange={handleColorChange}
          />
        </PanelBody>
      </InspectorControls>

      {/* 富文本 */}
      <RichText
        tagName="a"
        className={`btn btn--${props.attributes.size} btn--${props.attributes.colorName}`}
        // 编辑器菜单允许的操作
        allowedFormats={[]}
        value={props.attributes.text}
        onChange={handleTextChange}
      />

      {/* 修改按钮链接 */}
      {isLinkPickerVisible && (
        <Popover
          position="middle center"
          onFocusOutside={() => setIsLinkPickerVisible(false)}
        >
          <LinkControl
            settings={[]}
            value={props.attributes.linkObject}
            onChange={handleLinkChange}
          />
          <Button
            variant="primary"
            onClick={() => setIsLinkPickerVisible(false)}
            style={{ display: "block", width: "100%" }}
          >
            Confirm Link
          </Button>
        </Popover>
      )}
    </>
  )
}

function SaveComponent(props) {
  return (
    <a
      href={props.attributes.linkObject.url}
      className={`btn btn--${props.attributes.size} btn--${props.attributes.colorName}`}
    >
      {props.attributes.text}
    </a>
  )
}
