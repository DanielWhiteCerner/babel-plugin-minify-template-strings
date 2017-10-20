/* global html:false */
var expect = require('chai').expect;

function tag(strings, ...values) {
	let string = strings[0];

	for (let i = 0; i < values.length; i++) {
		string += 2 * values[i] + strings[i + 1];
	}

	return string;
}

describe('html tag', () => {
	it('should work with tabs', () => {
		expect(html`Line #1
			Line #2
			Line #3`).to.equal('Line #1Line #2Line #3');

		expect(html`Line #${1}
			Line #${2}
			Line #${3}`).to.equal('Line #1Line #2Line #3');

		expect(html`${1}. line #${1}
			${2}. line #${2}
			${3}. line`).to.equal('1. line #12. line #23. line');
	});

	it('should work with spaces', () => {
		expect(html`Line #1
            Line #2
            Line #3`).to.equal('Line #1Line #2Line #3');

		expect(html`Line #${1}
            Line #${2}
            Line #${3}`).to.equal('Line #1Line #2Line #3');

		expect(html`${1}. line #${1}
            ${2}. line #${2}
            ${3}. line`).to.equal('1. line #12. line #23. line');
	});

	it('should remove any leading/trailing line breaks and newline characters', () => {

		expect(
			html`
			Line #1
			Line #2
			Line #3
			`
		).to.equal('Line #1Line #2Line #3');

		expect(
			html`
			Line #${1}
			Line #${2}
			Line #${3}
			`
		).to.equal('Line #1Line #2Line #3');

		expect(
			html`
				${1}. line #${1}
				${2}. line #${2}
				${3}. line
			`
		).to.equal('1. line #12. line #23. line');

		expect(
			html`
			

			Line #1
			Line #2
			Line #3
			

			`
		).to.equal('Line #1Line #2Line #3');

		expect(
			html`


			Line #${1}
			Line #${2}
			Line #${3}


			`
		).to.equal('Line #1Line #2Line #3');

		expect(
			html`


			${1}. line #${1}
			${2}. line #${2}
			${3}. line


			`
		).to.equal('1. line #12. line #23. line');

		expect(html`

			<span>
				 \t {{i18n.SOMETHING}} 
			</span>
			
		`).to.equal('<span>{{i18n.SOMETHING}}</span>');

		expect(html`

			<span>
				${'Hello World'} \t
			</span>
			
		`).to.equal('<span>Hello World</span>');

		expect(html`

			<span>\n\t
				${'Hello World'} \t\n\t\n
			</span>
			
		`).to.equal('<span>Hello World</span>');
	});

	it('should ignore the last line if it doesn\'t contain anything else than whitespace', () => {
		expect(
			function () {
				return html`
					Line #1
					Line #2
					Line #3
				`;
			}()
		).to.equal('Line #1Line #2Line #3');

		expect(
			function () {
				return html`
					Line #${1}
					Line #${2}
					Line #${3}
				`;
			}()
		).to.equal('Line #1Line #2Line #3');

		expect(
			function () {
				return html`
					${1}. line #${1}
					${2}. line #${2}
					${3}. line
				`;
			}()
		).to.equal('1. line #12. line #23. line');
	});

	it('should operate on raw strings', () => {
		expect(
			html`
			\tLine #1
			\tLine #2
			\tLine #3
			`
		).to.equal('Line #1Line #2Line #3');

		expect(
			html`
			\tLine #${1}
			\tLine #${2}
			\tLine #${3}
			`
		).to.equal('Line #1Line #2Line #3');

		expect(
			html`
			\t${1}. line #${1}
			\t${2}. line #${2}
			\t${3}. line
			`
		).to.equal('1. line #12. line #23. line');
	});
});

describe('html() function', () => {
	it('should work with tabs', () => {
		expect(html(`Line #1
			Line #2
			Line #3`)).to.equal('Line #1Line #2Line #3');

		expect(html(`Line #${1}
			Line #${2}
			Line #${3}`)).to.equal('Line #1Line #2Line #3');

		expect(html(`${1}. line #${1}
			${2}. line #${2}
			${3}. line`)).to.equal('1. line #12. line #23. line');
	});

	it('should work with spaces', () => {
		expect(html(`Line #1
            Line #2
            Line #3`)).to.equal('Line #1Line #2Line #3');

		expect(html(`Line #${1}
            Line #${2}
            Line #${3}`)).to.equal('Line #1Line #2Line #3');

		expect(html(`${1}. line #${1}
            ${2}. line #${2}
            ${3}. line`)).to.equal('1. line #12. line #23. line');
	});

	it('should remove any leading/trailing line breaks and newline characters', () => {
		expect(
			html(`
			Line #1
			Line #2
			Line #3
			`)
		).to.equal('Line #1Line #2Line #3');

		expect(
			html(`
			Line #${1}
			Line #${2}
			Line #${3}
			`)
		).to.equal('Line #1Line #2Line #3');

		expect(
			html(`
			${1}. line #${1}
			${2}. line #${2}
			${3}. line
			`)
		).to.equal('1. line #12. line #23. line');

		expect(
			html(`


			Line #1
			Line #2
			Line #3


			`)
		).to.equal('Line #1Line #2Line #3');

		expect(
			html(`


			Line #${1}
			Line #${2}
			Line #${3}


			`)
		).to.equal('Line #1Line #2Line #3');

		expect(
			html(`


			${1}. line #${1}
			${2}. line #${2}
			${3}. line


			`)
		).to.equal('1. line #12. line #23. line');

		expect(html(`

			<span>
				 \t {{i18n.SOMETHING}} 
			</span>
			
		`)).to.equal('<span>{{i18n.SOMETHING}}</span>');

		expect(html(`

			<span>
				${'Hello World'} \t
			</span>
			
		`)).to.equal('<span>Hello World</span>');

		expect(html(`

			<span>\n\t
				${'Hello World'} \t\n\t\n
			</span>
			
		`)).to.equal('<span>Hello World</span>');
	});

	it('should ignore the last line if it doesn\'t contain anything else than whitespace', () => {
		expect(
			function () {
				return html(`
					Line #1
					Line #2
					Line #3
				`);
			}()
		).to.equal('Line #1Line #2Line #3');

		expect(
			function () {
				return html(`
					Line #${1}
					Line #${2}
					Line #${3}
				`);
			}()
		).to.equal('Line #1Line #2Line #3');

		expect(
			function () {
				return html(`
					${1}. line #${1}
					${2}. line #${2}
					${3}. line
				`);
			}()
		).to.equal('1. line #12. line #23. line');
	});

	it('should operate on raw strings', () => {
		expect(
			html(`
			\tLine #1
			\tLine #2
			\tLine #3
			`)
		).to.equal('Line #1Line #2Line #3');

		expect(
			html(`
			\tLine #${1}
			\tLine #${2}
			\tLine #${3}
			`)
		).to.equal('Line #1Line #2Line #3');

		expect(
			html(`
			\t${1}. line #${1}
			\t${2}. line #${2}
			\t${3}. line
			`)
		).to.equal('1. line #12. line #23. line');
	});
});

describe('html() function with custom tag', () => {
	it('should work with tabs', () => {
		expect(html(tag`Line #1
			Line #2
			Line #3`)).to.equal('Line #1Line #2Line #3');

		expect(html(tag`Line #${1}
			Line #${2}
			Line #${3}`)).to.equal('Line #2Line #4Line #6');

		expect(html(tag`${1}. line #${1}
			${2}. line #${2}
			${3}. line`)).to.equal('2. line #24. line #46. line');
	});

	it('should work with spaces', () => {
		expect(html(tag`Line #1
            Line #2
            Line #3`)).to.equal('Line #1Line #2Line #3');

		expect(html(tag`Line #${1}
            Line #${2}
            Line #${3}`)).to.equal('Line #2Line #4Line #6');

		expect(html(tag`${1}. line #${1}
            ${2}. line #${2}
            ${3}. line`)).to.equal('2. line #24. line #46. line');
	});

	it('should remove any leading/trailing line breaks and newline characters', () => {
		expect(
			html(tag`
			Line #1
			Line #2
			Line #3
			`)
		).to.equal('Line #1Line #2Line #3');

		expect(
			html(tag`
			Line #${1}
			Line #${2}
			Line #${3}
			`)
		).to.equal('Line #2Line #4Line #6');

		expect(
			html(tag`
			${1}. line #${1}
			${2}. line #${2}
			${3}. line
			`)
		).to.equal('2. line #24. line #46. line');

		expect(
			html(tag`


			Line #1
			Line #2
			Line #3


			`)
		).to.equal('Line #1Line #2Line #3');

		expect(
			html(tag`


			Line #${1}
			Line #${2}
			Line #${3}


			`)
		).to.equal('Line #2Line #4Line #6');

		expect(
			html(tag`


			${1}. line #${1}
			${2}. line #${2}
			${3}. line


			`)
		).to.equal('2. line #24. line #46. line');

		expect(html(tag`

			<span>
				 \t {{i18n.SOMETHING}} 
			</span>
			
		`)).to.equal('<span>{{i18n.SOMETHING}}</span>');

		expect(html(tag`

			<span>
				${2} \t
			</span>
			
		`)).to.equal('<span>4</span>');

		expect(html(tag`

			<span>\n\t
				${2} \t\n\t\n
			</span>
			
		`)).to.equal('<span>4</span>');
	});

	it('should ignore the last line if it doesn\'t contain anything else than whitespace', () => {
		expect(
			function () {
				return html(tag`
					Line #1
					Line #2
					Line #3
				`);
			}()
		).to.equal('Line #1Line #2Line #3');

		expect(
			function () {
				return html(tag`
					Line #${1}
					Line #${2}
					Line #${3}
				`);
			}()
		).to.equal('Line #2Line #4Line #6');

		expect(
			function () {
				return html(tag`
					${1}. line #${1}
					${2}. line #${2}
					${3}. line
				`);
			}()
		).to.equal('2. line #24. line #46. line');
	});

	it('should operate on raw strings', () => {
		expect(
			html(tag`
			\tLine #1
			\tLine #2
			\tLine #3
			`)
		).to.equal('Line #1Line #2Line #3');

		expect(
			html(tag`
			\tLine #${1}
			\tLine #${2} \t
			\tLine #${3}
			`)
		).to.equal('Line #2Line #4Line #6');

		expect(
			html(tag`
			\t${1}. line #${1}
			\t${2}. line #${2}
			\t${3}. line
			`)
		).to.equal('2. line #24. line #46. line');
	});
});
