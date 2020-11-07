import React, { useState } from 'react'
import { graphql } from 'react-apollo';
import { getAuthorsQuery } from '../queries/queries';

function AddBook(props) {
	const [bookName, setBookName] = useState('');
	const [genre, setGenre] = useState('');
	const [authorId, setAuthorId] = useState('');

	const displayAuthors = () => {
		const data = props.data;
		if (data.loading) {
			return (
				<option disabled>Loading Authors...</option>
			)
		} else {
			return data.authors.map(author => {
				return <option key={author.id} value={author.id}>{author.name}</option>
			})
		}
	}

	const submitForm = (e) => {
		e.preventDefault();
	}
	return (
		<form id="add-book" onSubmit={ submitForm}>

			<div className="field">
				<label>Book name</label>
				<input type="text" onChange={ (e) => setBookName(e.target.value) } />
			</div>

			<div className="field">
				<label>Genre:</label>
				<input type="text" onChange={ (e) => setGenre(e.target.value) } />
			</div>

			<div className="field">
				<label>Author:</label>
				<select onChange={ (e) => setGenre(e.target.value) }>
					<option>Select author</option>
					{displayAuthors()}
				</select>
			</div>

			<button type="submit">+</button>
		</form>
	);
}

export default graphql(getAuthorsQuery)(AddBook);
