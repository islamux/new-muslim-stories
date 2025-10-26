
# Styling Guide

This document provides a guide to the styling conventions used in the "New Muslim Stories" project.

## Introduction

The project uses [Tailwind CSS](https://tailwindcss.com/) for all styling. Tailwind is a utility-first CSS framework that allows us to build custom designs without writing custom CSS.

## Colors

The color palette is defined in `tailwind.config.ts`. It includes a range of colors, including a custom `coral` accent color and a neutral `gray` palette.

### Primary Palettes

- **Green:** Used for positive actions and accents.
- **Beige:** A warm, neutral color used for backgrounds and highlights.
- **Gold:** A vibrant accent color.
- **Sky:** A cool, calming blue.
- **Coral:** A new accent color for links and highlights.
- **Gray:** The primary neutral gray palette for text, backgrounds, and borders.

### Theming Colors

- `background`: The primary background color. This is defined using CSS variables and will change based on the current theme (light or dark).
- `foreground`: The primary text color. This is also defined using CSS variables.

## Fonts

The project uses two primary font families, defined in `tailwind.config.ts`:

- **`sans`**: The primary font for all body text. It uses the `Inter` font.
- **`heading`**: The font used for all headings (`h1`, `h2`, etc.). It uses the `Montserrat` font.

## Dark Mode

The project uses a class-based dark mode, managed by the `next-themes` library. When dark mode is active, the `dark` class is applied to the `<html>` element. All dark mode styles should be implemented using Tailwind's `dark:` variant.

**Example:**

```html
<div class="bg-white dark:bg-gray-800">
  <!-- This div will have a white background in light mode and a gray background in dark mode -->
</div>
```

## Responsive Design

All components should be designed to be responsive. Use Tailwind's responsive design features (e.g., `sm:`, `md:`, `lg:`, `xl:`) to create layouts that work on all screen sizes.

## Component Styling

Whenever possible, styles should be co-located with the components they apply to. Use the `className` prop to apply Tailwind classes directly to your React components.

For more complex components, you can create a separate `.css` file and import it into your component, but this should be avoided unless absolutely necessary.
