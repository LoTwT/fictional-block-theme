import {
  InnerBlocks,
  InspectorControls,
  MediaUpload,
  MediaUploadCheck,
} from "@wordpress/block-editor"
import { Button, PanelBody, PanelRow } from "@wordpress/components"
import { registerBlockType } from "@wordpress/blocks"
import apiFetch from "@wordpress/api-fetch"
import { useEffect } from "@wordpress/element"

registerBlockType("ourblocktheme/slide", {
  title: "Slide",
  supports: {
    align: ["full"], // 占据全屏宽度
  },
  attributes: {
    align: { type: "string", default: "full" },
    imgID: { type: "number" },
    imgURL: { type: "string", default: window.banner.fallbackimage },
  },
  edit: EditComponent,
  save: SaveComponent,
})

function EditComponent(props) {
  useEffect(() => {
    if (props.attributes.imgID) {
      const go = async () => {
        const response = await apiFetch({
          method: "GET",
          path: `/wp/v2/media/${props.attributes.imgID}`,
        })
        props.setAttributes({
          imgURL: response.media_details.sizes.pageBanner.source_url,
        })
      }

      go()
    }
  }, [props.attributes.imgID])

  const onFileSelect = (img) => {
    props.setAttributes({ imgID: img.id })
  }

  return (
    <>
      {/* 侧边菜单上传 */}
      <InspectorControls>
        <PanelBody title="Background" initialOpen>
          <PanelRow>
            <MediaUploadCheck>
              <MediaUpload
                onSelect={onFileSelect}
                value={props.attributes.imgID}
                // 实际渲染在侧边菜单中的组件样式，wordpress 内置了打开媒体上传对话框的方法 open
                render={({ open }) => (
                  <Button onClick={open}>Choose Image</Button>
                )}
              />
            </MediaUploadCheck>
          </PanelRow>
        </PanelBody>
      </InspectorControls>

      {/* 页面 */}
      <div
        className="hero-slider__slide"
        style={{
          backgroundImage: `url("${props.attributes.imgURL}")`,
        }}
      >
        <div className="hero-slider__interior container">
          <div className="hero-slider__overlay t-center">
            {/* 内部块，提供编辑功能 */}
            <InnerBlocks
              allowedBlocks={[
                "ourblocktheme/genericheading",
                "ourblocktheme/genericbutton",
              ]}
            />
          </div>
        </div>
      </div>
    </>
  )
}

function SaveComponent() {
  return <InnerBlocks.Content />
}
