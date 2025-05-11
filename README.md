# Skip Selector UI – Design Improvements & Rationale

Hi! 👋

This is a refined version of the original Skip Selector UI. I really enjoyed working on this – the base design was already great, which made the process even more rewarding. Below is a summary of the improvements I made, what practices I followed, and why I made certain design decisions.

---

## 🔧 Improvements Made

### 1. **Skeleton Loader for Smoother UX**
To enhance perceived performance and reduce layout shift, I added a skeleton loading state while data is being fetched or loaded from `localStorage`. This gives users immediate visual feedback and provides a polished, app-like feel.

### 2. **Persistent Selection using `localStorage`**
I kept the original idea of storing the selected skip in `localStorage`, but improved its reactivity by syncing it in real-time using:
- A `storage` event listener
- A polling interval fallback (to cover cases like multiple tabs or race conditions)

This ensures the selected skip state remains consistent and up-to-date.

### 3. **Responsive & Clean Bottom Bar**
- Improved alignment of the cards information for better readability.
- Rearranged the layout so price info and selection details are clearly readable and closer together.

### 4. **Refined Price Breakdown Display**
- Highlighted dynamic price values (`Transport`, `Per Tonne`, `VAT`) in **bold** for better scannability.
- Made the total price more prominent using larger, blue text to direct user focus.
- Arranged the bottom bar price and information as it was not consistently positioned.

### 5. **Visual Feedback on Skip Cards**
- Kept and improved the original yellow/red flagged skips (like "Not Allowed On Road").
- Moved the “✓ Selected” badge onto the image area in the top-right for a cleaner layout.
- Added subtle `framer-motion` hover effects for interactivity without overwhelming the user.

---

## ✅ Best Practices Followed

- **Component Reusability**: Designed each UI block to be as self-contained and composable as possible.
- **Conditional Logic Separation**: All business logic (e.g. disable rules, price computation) is clearly separated from the presentation layer.
- **Accessibility**: Kept alt attributes for images and ensured visual cues (color, text) are not the only indicators.
- **Production-Ready Comments**: Code is clean and documented where necessary—no clutter, just helpful context.
- **State Syncing**: Combined event-based and interval-based syncing for more reliable UI state management across tabs or sessions.

---

What I Kept from the Original Design

- The **yellow warning flags** and **conditional disabling** of certain skip types – these were useful and intuitive.
- The **use of `localStorage`** to persist user choices.
- The **core structure and tone** of the UI – I aimed to enhance the flow, not change it entirely.

---

## 🐳 Docker Support
I've added Docker support to the project to make it easier to run and deploy consistently across different environments.

The setup uses a multi-stage Docker build to keep the final image lightweight and secure, and it's based on the official node:20-alpine image, which is optimized for production use and currently has no known high vulnerabilities.

## 🔧 How It Works
The first stage (builder) installs dependencies and builds the Next.js application using npm run build.

The second stage (runner) copies only what's needed to run the app, ensuring a smaller and more secure final image.

The app is served using next start, which is suitable for production deployment.

Port 3000 is exposed by default, matching the Next.js standard.

## 🛠️ Running the App with Docker
You can build and run the container using:

docker build -t my-next-app .
docker run -p 3000:3000 my-next-app
Then visit: http://localhost:3000

This setup ensures easy deployment in any environment with Docker installed and avoids version drift issues during dev/test/production handoffs. It also aligns with best practices in production-grade app containerization.

## Final Thoughts

I genuinely enjoyed working on this and was impressed with the original design direction. It had a solid foundation and clear intent, which made iterating on it both easy and enjoyable.

That said, this version is just one take. I believe good design is iterative, and there's always room to test, evolve, and optimize. I'd love to hear feedback and ideas to keep improving it further.

Thanks for checking it out!

Looking forward to hearing from you!
Sbughea Vlad
