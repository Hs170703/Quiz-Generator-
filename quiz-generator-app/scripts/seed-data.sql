-- Insert sample users
INSERT INTO users (email, name, avatar_url) VALUES
('john@example.com', 'John Doe', '/placeholder.svg?height=32&width=32'),
('sarah@example.com', 'Sarah Chen', '/placeholder.svg?height=32&width=32'),
('mike@example.com', 'Mike Rodriguez', '/placeholder.svg?height=32&width=32'),
('alex@example.com', 'Alex Johnson', '/placeholder.svg?height=32&width=32')
ON CONFLICT (email) DO NOTHING;

-- Insert sample quizzes
INSERT INTO quizzes (title, description, created_by, visibility, time_limit, difficulty) VALUES
('JavaScript Fundamentals', 'Test your knowledge of JavaScript basics', 1, 'public', 600, 'medium'),
('React Hooks Deep Dive', 'Advanced React hooks concepts and patterns', 2, 'public', 900, 'hard'),
('Python Data Structures', 'Lists, dictionaries, sets, and more', 3, 'public', 480, 'easy'),
('Web Security Basics', 'Essential web security concepts', 1, 'public', 720, 'medium');

-- Insert sample questions for JavaScript Fundamentals quiz
INSERT INTO questions (quiz_id, question_text, options, correct_answer, explanation, order_index) VALUES
(1, 'What is the correct way to declare a variable in JavaScript?', 
 '["var myVar;", "variable myVar;", "v myVar;", "declare myVar;"]', 
 0, 'The "var" keyword is used to declare variables in JavaScript, though "let" and "const" are preferred in modern JavaScript.', 1),

(1, 'Which method is used to add an element to the end of an array?', 
 '["append()", "push()", "add()", "insert()"]', 
 1, 'The push() method adds one or more elements to the end of an array and returns the new length of the array.', 2),

(1, 'What does "===" operator do in JavaScript?', 
 '["Assignment", "Equality without type checking", "Strict equality with type checking", "Not equal"]', 
 2, 'The === operator checks for strict equality, meaning both value and type must be the same.', 3);

-- Insert sample quiz attempts
INSERT INTO quiz_attempts (quiz_id, user_id, score, correct_answers, total_questions, time_spent, answers) VALUES
(1, 2, 85, 13, 15, 525, '{"1": 0, "2": 1, "3": 2}'),
(1, 3, 92, 14, 15, 480, '{"1": 0, "2": 1, "3": 2}'),
(2, 1, 78, 16, 20, 720, '{"1": 1, "2": 0, "3": 2}');

-- Insert sample discussions
INSERT INTO discussions (title, content, author_id, quiz_id, is_answered, upvotes) VALUES
('Confused about JavaScript closures', 'Can someone explain how closures work in JavaScript? I keep getting confused about the scope.', 2, 1, true, 24),
('React useEffect dependency array', 'Why do we need to include all dependencies in the useEffect dependency array? What happens if we don''t?', 3, 2, false, 18),
('Python list comprehension vs loops', 'When should I use list comprehensions instead of regular for loops? Are there performance differences?', 4, 3, true, 31);

-- Insert sample discussion tags
INSERT INTO discussion_tags (discussion_id, tag_name) VALUES
(1, 'JavaScript'), (1, 'Closures'), (1, 'Scope'),
(2, 'React'), (2, 'Hooks'), (2, 'useEffect'),
(3, 'Python'), (3, 'Performance'), (3, 'Best Practices');

-- Insert sample discussion replies
INSERT INTO discussion_replies (discussion_id, author_id, content, upvotes, is_accepted) VALUES
(1, 1, 'Closures in JavaScript occur when an inner function has access to variables from its outer function scope even after the outer function has finished executing. This creates a "closure" around those variables.', 15, true),
(2, 4, 'The dependency array tells React when to re-run the effect. If you omit dependencies that are used inside the effect, you might get stale values or infinite loops.', 8, false),
(3, 1, 'List comprehensions are generally more readable and can be faster for simple operations. Use regular loops when you need more complex logic or multiple statements.', 12, true);
