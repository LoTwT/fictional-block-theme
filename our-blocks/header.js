wp.blocks.registerBlockType("ourblocktheme/header", {
  title: "Ficional University Header",
  edit: () =>
    wp.element.createElement(
      "div",
      {
        className: "our-placeholder-block",
      },
      "Ficional University Header placeholder"
    ),
  save: () => null,
})
