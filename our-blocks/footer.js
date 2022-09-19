wp.blocks.registerBlockType("ourblocktheme/footer", {
  title: "Ficional University Footer",
  edit: () =>
    wp.element.createElement(
      "div",
      {
        className: "our-placeholder-block",
      },
      "Ficional University Footer placeholder"
    ),
  save: () => null,
})
