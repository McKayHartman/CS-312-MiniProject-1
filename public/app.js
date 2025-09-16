// Get all doc elements by id into variables

const form = document.getElementById("postSubmissionForm");
const textarea = document.getElementById("typingBox");
const authorName = document.getElementById("nameInput")
const postDisplay = document.getElementById("postDisplay");


// Event listener for submit button press

form.addEventListener('submit', async function(e) {
  e.preventDefault();

  const text = textarea.value;
  const author = authorName.value;
  const timestamp = new Date();

  if (text !== '' && author !== '') {
    const response = await fetch("/posts", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        author,
        text,
        timestamp: timestamp.toISOString(),
      }),
    });

    const currentPost = await response.json();

    // add the post
    addPost(currentPost);

    // reset fields
    textarea.value = '';
    authorName.value = '';
  }
});
			
// function adds posts to the DOM
function addPost(post){
	// creat post object to contain the whole post
	const postContainer = document.createElement('div');

	// add the author part
	const newAuthor = document.createElement('h3'); //create object
	newAuthor.textContent = post.author; // add text to object
	postContainer.appendChild(newAuthor); // add the object to super object

	// date and time stamp
	const timestamp = document.createElement('small');
	const stamp = new Date(post.timestamp);
	// add date and time to timestamp small text
	timestamp.textContent = stamp.toDateString() + " " + stamp.toLocaleTimeString();
	// append to object
	postContainer.appendChild(timestamp);

	// add the blog post part
	const newPost = document.createElement('p');
	newPost.textContent = post.text;
	newPost.innerHTML = post.text.replace(/\n/g, '<br>'); // sub the newlines
	postContainer.appendChild(newPost);

	// add buttons (edit and delete) to the object

	// button container div
	const buttonsDiv = document.createElement('div');
	buttonsDiv.classList.add('post-buttons');

	// Edit
	console.log('test');
	const editButton = document.createElement('button');
	editButton.textContent = 'Edit';
	editButton.classList.add('btn', 'btn-sm');
	editButton.addEventListener('click', () => {
		// just takes the text and puts it into the box
		textarea.value = post.text;
    	authorName.value = post.author;
		// ideally submit should handle the reposting

		// nuke it
		postContainer.remove();
	});

	// Delete
	const deleteButton = document.createElement('button');
	deleteButton.textContent = 'Delete';
	deleteButton.classList.add('btn', 'btn-sm');
	deleteButton.addEventListener('click', () => {
		// delete the entire super object
		postContainer.remove()
	})

	// add the buttons to the button div object
	buttonsDiv.appendChild(editButton);
	buttonsDiv.appendChild(deleteButton);
	// add the button div to the main super object
	postContainer.appendChild(buttonsDiv);


	// add the separators to end of post
	const br = document.createElement('br')
	const hr = document.createElement('hr');
	postContainer.appendChild(br);
	postContainer.appendChild(hr);
	postContainer.appendChild(br);

	// append the full object to the webpage
	postDisplay.appendChild(postContainer);

}