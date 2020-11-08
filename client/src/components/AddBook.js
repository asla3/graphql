import React, { useState } from 'react'
import { graphql } from 'react-apollo';
import * as compose from 'lodash.flowright';
import { getAuthorsQuery, addBookMutation, getBooksQuery } from '../queries/queries';

function AddBook(props) {
	const [bookName, setBookName] = useState('');
	const [genre, setGenre] = useState('');
	const [authorId, setAuthorId] = useState('select-author');

	const displayAuthors = () => {
		const data = props.getAuthorsQuery;
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
		props.addBookMutation({
			variables: {
				name: bookName,
				genre: genre,
				authorId: authorId
			},
			refetchQueries: [{ query: getBooksQuery }]
		});
		setBookName('');
		setGenre('');
		setAuthorId('select-author');
	}
	return (
		<form id="add-book" onSubmit={ submitForm}>

			<div className="field">
				<label>Book name</label>
				<input type="text" value={bookName} onChange={ (e) => setBookName(e.target.value) } />
			</div>

			<div className="field">
				<label>Genre:</label>
				<input type="text" value={genre} onChange={ (e) => setGenre(e.target.value) } />
			</div>

			<div className="field">
				<label>Author:</label>
				<select value={authorId} onChange={ (e) => setAuthorId(e.target.value) }>
					<option disabled selected value="select-author">Select author</option>
					{displayAuthors()}
				</select>
			</div>

			<button type="submit">+</button>
		</form>
	);
}

export default compose(
	graphql(getAuthorsQuery, {name: "getAuthorsQuery"}),
	graphql(addBookMutation, {name: "addBookMutation"})
)(AddBook);
