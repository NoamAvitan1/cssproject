const s = `/* Dummy CSS File with Complex Properties */

/* Styles for a container */
.container {
  width: 100%;
  max-width: 1200px;
  margin: 0 auto;
  padding: 20px;
  box-sizing: border-box;
  border: 2px solid #ccc;
  border-radius: 10px;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
}

/* Styles for a header */
.header {
  font-size: 24px;
  font-weight: bold;
  color: #333;
  padding: 10px;
  background-color: #f9f9f9;
}

/* Styles for a paragraph */
.paragraph {
  font-size: 16px;
  line-height: 1.5;
  margin-bottom: 20px;
  text-align: justify;
}

/* Styles for a button */
.button {
  display: inline-block;
  padding: 10px 20px;
  font-size: 18px;
  font-weight: bold;
  text-align: center;
  text-decoration: none;
  background-color: #0088cc;
  color: #fff;
  border: 2px solid #005580;
  border-radius: 5px;
  cursor: pointer;
}

.button:hover {
  background-color: #005580;
}

/* Styles for a form input */
.input {
  width: 100%;
  padding: 10px;
  margin-bottom: 10px;
  border: 1px solid #ccc;
  border-radius: 5px;
  font-size: 16px;
  box-sizing: border-box;
}

/* Styles for a list */
.list {
  list-style: none;
  padding: 0;
}

.list-item {
  margin-bottom: 10px;
}

.list-item:last-child {
  margin-bottom: 0;
}

.list-item a {
  color: #336699;
  text-decoration: none;
}

.list-item a:hover {
  text-decoration: underline;
}
`

console.log(s.length)
// console.log(s.find('d'))