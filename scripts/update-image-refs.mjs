import fs from 'fs';
import path from 'path';

const storiesDir = 'src/stories';
const exts = ['.png', '.jpg', '.jpeg'];
let updatedCount = 0;

const files = fs.readdirSync(storiesDir).filter(f => f.endsWith('.md'));

for (const file of files) {
  const filePath = path.join(storiesDir, file);
  let content = fs.readFileSync(filePath, 'utf8');
  let original = content;

  for (const ext of exts) {
    // Replace image: "/images/foo.png" -> image: "/images/foo.webp"
    content = content.replace(
      new RegExp('(image: *["\']?/images/[^"\']*)\\' + ext + '(["\'])', 'g'),
      '$1.webp$2'
    );
    content = content.replace(
      new RegExp('(profilePhoto: *["\']?/images/[^"\']*)\\' + ext + '(["\'])', 'g'),
      '$1.webp$2'
    );
  }

  if (content !== original) {
    fs.writeFileSync(filePath, content, 'utf8');
    updatedCount++;
    console.log(`Updated: ${file}`);
  }
}

console.log(`\nDone. ${updatedCount} markdown files updated.`);
