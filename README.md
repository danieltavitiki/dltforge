# DLT Forge - Daniel Tavitiki Portfolio

A modern, responsive portfolio website showcasing iOS and Android app development services, experience, and projects.

## Features

- **Responsive Design**: Fully responsive layout that works on all devices
- **Modern UI**: Clean, minimalist design with smooth animations
- **Sticky Navigation**: Easy navigation with a sticky header that follows you as you scroll
- **Smooth Scrolling**: Seamless transitions between sections
- **Contact Form**: Integrated contact form for inquiries
- **SEO Optimized**: Proper meta tags and semantic HTML
- **Accessibility**: Built with accessibility best practices

## Structure

- `index.html` - Main HTML structure
- `styles.css` - All styling and responsive design
- `script.js` - Interactive features and animations
- `favicon.svg` - Site favicon/icon

## Sections

1. **Hero** - Introduction with name, title, and call-to-action buttons
2. **About** - Background, skills, and highlights
3. **Experience** - Professional work history at Tech Mahindra and Dell Technologies
4. **Projects** - Showcase of apps and web projects
5. **Services** - List of services offered
6. **Contact** - Contact information and form
7. **Footer** - Copyright and credits

## Customization

### Colors

Edit the CSS variables in `styles.css`:

```css
--color-primary: #0891b2;    /* Teal - main brand color */
--color-accent: #fbbf24;     /* Gold - accent color */
--color-text: #1e293b;       /* Dark gray - main text */
```

### Contact Form Integration

To connect the contact form to a backend service:

1. **Formspree** (Recommended):
   - Sign up at https://formspree.io
   - Update the form action in `script.js` with your endpoint
   
2. **Supabase**:
   - Create a table for form submissions
   - Add the Supabase client and insert logic

3. **Firebase**:
   - Set up Firestore
   - Add Firebase SDK and form submission logic

### Project Links

Update the project links in `index.html` with actual App Store, Google Play, or project URLs.

### Social Links

Add your actual social media and profile URLs in the contact section:

```html
<a href="https://github.com/yourusername">GitHub</a>
<a href="https://linkedin.com/in/yourprofile">LinkedIn</a>
```

## Deployment

### Vercel (Recommended)

1. Install Vercel CLI: `npm i -g vercel`
2. Run: `vercel`
3. Follow the prompts

### Netlify

1. Drag and drop the folder to netlify.com/drop
2. Or use Netlify CLI: `npm i -g netlify-cli` then `netlify deploy`

### GitHub Pages

1. Create a repository
2. Push your code
3. Enable GitHub Pages in repository settings

## Technologies

- HTML5
- CSS3 (with CSS Grid and Flexbox)
- Vanilla JavaScript
- Google Fonts (Inter & Roboto)

## Browser Support

- Chrome (latest)
- Firefox (latest)
- Safari (latest)
- Edge (latest)

## License

© 2025 DLT Forge. All rights reserved.

## Contact

Daniel Tavitiki  
Email: support@dltforge.com  
Website: https://dltforge.com

