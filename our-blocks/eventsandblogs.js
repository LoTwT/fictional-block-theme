wp.blocks.registerBlockType("ourblocktheme/eventsandblogs", {
  title: "Events and Blogs",
  edit: () =>
    wp.element.createElement(
      "div",
      {
        className: "our-placeholder-block",
      },
      "Events and Blogs placeholder"
    ),
  save: () => null,
})
