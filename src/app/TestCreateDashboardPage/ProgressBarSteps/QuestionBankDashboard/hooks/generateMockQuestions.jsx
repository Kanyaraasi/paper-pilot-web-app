// Mock data generator for question bank
const generateMockQuestions = (type, count = 500) => {
  const questions = [];
  
  for (let i = 1; i <= count; i++) {
    const tags = [];
    // Randomly assign 1-3 tags
    const numTags = Math.floor(Math.random() * 3) + 1;
    const possibleTags = ['Math', 'Science', 'History', 'Geography', 'English', 'Physics', 'Chemistry', 'Biology'];
    for (let j = 0; j < numTags; j++) {
      const randomTag = possibleTags[Math.floor(Math.random() * possibleTags.length)];
      if (!tags.includes(randomTag)) tags.push(randomTag);
    }
    
    // Add random creation date within the last 60 days
    const randomDaysAgo = Math.floor(Math.random() * 60);
    const createdAt = new Date();
    createdAt.setDate(createdAt.getDate() - randomDaysAgo);
    
    switch(type) {
      case 'fill':
        questions.push({
          id: `fill-${i}`,
          text: `Fill in the blank question ${i}: The sum of angles in a triangle is always _____.`,
          answer: '180 degrees',
          difficulty: i % 3 === 0 ? 'Hard' : i % 2 === 0 ? 'Medium' : 'Easy',
          tags,
          createdAt,
          lastUsed: i % 4 === 0 ? createdAt : null,
          timesUsed: Math.floor(Math.random() * 10),
          starred: i % 7 === 0,
        });
        break;
      case 'brief':
        questions.push({
          id: `brief-${i}`,
          text: `Answer briefly question ${i}: Explain Newton's First Law of Motion.`,
          answer: 'An object at rest stays at rest, and an object in motion stays in motion with the same speed and direction unless acted upon by an external force.',
          difficulty: i % 3 === 0 ? 'Hard' : i % 2 === 0 ? 'Medium' : 'Easy',
          tags,
          createdAt,
          lastUsed: i % 4 === 0 ? createdAt : null,
          timesUsed: Math.floor(Math.random() * 10),
          starred: i % 7 === 0,
        });
        break;
      case 'sentence':
        questions.push({
          id: `sentence-${i}`,
          text: `One sentence answer question ${i}: What is photosynthesis?`,
          answer: 'Photosynthesis is the process by which green plants and some other organisms use sunlight to synthesize nutrients from carbon dioxide and water.',
          difficulty: i % 3 === 0 ? 'Hard' : i % 2 === 0 ? 'Medium' : 'Easy',
          tags,
          createdAt,
          lastUsed: i % 4 === 0 ? createdAt : null,
          timesUsed: Math.floor(Math.random() * 10),
          starred: i % 7 === 0,
        });
        break;
      case 'match':
        questions.push({
          id: `match-${i}`,
          items: [
            { id: `${i}-A`, left: `Country ${i}A`, right: `Capital ${i}A` },
            { id: `${i}-B`, left: `Country ${i}B`, right: `Capital ${i}B` },
            { id: `${i}-C`, left: `Country ${i}C`, right: `Capital ${i}C` },
            { id: `${i}-D`, left: `Country ${i}D`, right: `Capital ${i}D` }
          ],
          difficulty: i % 3 === 0 ? 'Hard' : i % 2 === 0 ? 'Medium' : 'Easy',
          tags,
          createdAt,
          lastUsed: i % 4 === 0 ? createdAt : null,
          timesUsed: Math.floor(Math.random() * 10),
          starred: i % 7 === 0,
        });
        break;
      default:
        break;
    }
  }
  
  return questions;
};

export { generateMockQuestions };