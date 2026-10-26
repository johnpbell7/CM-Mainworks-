// CM MainWorks design tokens (mirror of tokens.css)
export const colors = {
  ink: "#1A2238", ink2: "#5F6575", ink3: "#9A9EA8", line: "#E8E4DC",
  bg: "#FFFFFF", grey: "#F5F5F4", soft: "#F7F4EE",
  navy: "#16264A", gold: "#D9A441", goldHover: "#E4B357", goldInk: "#8F6418", chalk: "#F5EFE4",
  oak: "#B07D45", steel: "#3D78B5", sage: "#3F7D5C", brick: "#B5473A",
  tint: { gold: "#F7E3B5", oak: "#F1DEC6", steel: "#D7E6F5", sage: "#D3E8DB", brick: "#F5D7D1" },
} as const;

export const sections = [
  { slug: "carpentry",  name: "Carpentry",  color: colors.oak,   tint: colors.tint.oak,   brandSwatch: "#C79A64",
    blurb: "Internal doors, skirting, staircases, kitchens and fitted wardrobes." },
  { slug: "building",   name: "Building",   color: colors.steel, tint: colors.tint.steel, brandSwatch: "#3D78B5",
    blurb: "Extensions, structural alterations and renovations." },
  { slug: "joinery",    name: "Joinery",    color: colors.sage,  tint: colors.tint.sage,  brandSwatch: "#3F7D5C",
    blurb: "Made-to-fit media walls, alcove units, shelving and storage." },
  { slug: "decorating", name: "Decorating", color: colors.brick, tint: colors.tint.brick, brandSwatch: "#B5473A",
    blurb: "Painting and finishing, right through to the last coat." },
] as const;

export const business = {
  name: "CM MainWorks",
  descriptor: "Carpentry & Construction",
  owner: "Connor",
  phoneDisplay: "07742 135592",
  phoneHref: "tel:+447742135592",
  whatsapp: "https://wa.me/447742135592",
  facebook: "https://www.facebook.com/61574301627028/",
  base: "Lichfield, Staffordshire",
  areas: ["Lichfield", "Burntwood", "Tamworth", "Sutton Coldfield", "Shenstone", "Whittington", "Fradley"],
} as const;
