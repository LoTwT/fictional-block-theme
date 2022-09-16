import { InnerBlocks } from "@wordpress/block-editor"
import { registerBlockType } from "@wordpress/blocks"

registerBlockType("ourblocktheme/banner", {
  title: "Banner",
  supports: {
    align: ["full"], // 占据全屏宽度
  },
  attributes: {
    align: { type: "string", default: "full" },
  },
  edit: EditComponent,
  save: SaveComponent,
})

function EditComponent() {
  // const useMeLater = (
  //   <>
  //     <h1 className="headline headline--large">Welcome!</h1>
  //     <h2 className="headline headline--medium">
  //       We think you&rsquo;ll like it here.
  //     </h2>
  //     <h3 className="headline headline--small">
  //       Why don&rsquo;t you check out the <strong>major</strong> you&rsquo;re
  //       interested in?
  //     </h3>
  //     <a href="#" className="btn btn--large btn--blue">
  //       Find Your Major
  //     </a>
  //   </>
  // )

  return (
    <div className="page-banner">
      <div
        className="page-banner__bg-image"
        style={{
          backgroundImage:
            "url('/wordpress/wp-content/themes/fictional-block-theme/images/library-hero.jpg')",
        }}
      />
      <div className="page-banner__content container t-center c-white">
        {/* 内部块，提供编辑功能 */}
        <InnerBlocks allowedBlocks={["ourblocktheme/genericheading", "ourblocktheme/genericbutton"]} />
      </div>
    </div>
  )
}

function SaveComponent() {
  return (
    <div className="page-banner">
      <div
        className="page-banner__bg-image"
        style={{
          backgroundImage:
            "url('/wordpress/wp-content/themes/fictional-block-theme/images/library-hero.jpg')",
        }}
      />
      <div className="page-banner__content container t-center c-white">
        {/* 内部块的输出，保存到数据库的内容 */}
        <InnerBlocks.Content />
      </div>
    </div>
  )
}
