const stars = document.querySelectorAll('.star');
const submitButton = document.getElementById('submitButton');
const reviewDetails = document.getElementById('reviewInput');
const reviews = document.getElementById('reviewContainer');

class ReviewWidget {
    constructor(stars, submitButton, reviewDetails, reviewContainer) {
        this.rating = 0;
        this.review = '';

        this.starsElement = stars;
        this.submitButtonElement = submitButton;
        this.reviewDetailsElement = reviewDetails;
        this.reviewContainer = reviewContainer;

        this.starsElement.forEach(star => {
            star.addEventListener('mouseover', this.onStarHover.bind(this));
            star.addEventListener('mouseout', this.onStarHoverOut.bind(this));
            star.addEventListener('click', this.onStarClick.bind(this));
        });

        this.reviewDetailsElement.addEventListener('input', this.onReviewDetailsChange.bind(this));

        this.submitButtonElement.addEventListener('click', this.submitReview.bind(this));
        this.submitButtonElement.setAttribute('disabled', '');
    }

    onStarHover(e) {
        const closest = e.target.closest('.star');

        if (closest) {
            const closestIndex = parseInt(closest.getAttribute('data-star-index'));

            this.starsElement.forEach(star => {
                const index = parseInt(star.getAttribute('data-star-index'));
                star.classList.add('hovered-default');

                if (index <= closestIndex) {
                    star.classList.add('hovered');
                } else {
                    star.classList.remove('hovered');
                }
            })
        }
    }

    onStarHoverOut() {
        this.starsElement.forEach(star => {
            star.classList.remove('hovered', 'hovered-default');
        })
    }

    onStarClick(e) {
        const closest = e.target.closest('.star');

        if (closest) {
            this.rating = parseInt(closest.getAttribute('data-star-index'));

            this.starsElement.forEach(star => {
                // get the index of current star
                const index = parseInt(star.getAttribute('data-star-index'));

                // remove any hover styling
                star.classList.remove('hovered', 'hovered-default');

                // update selected state of each star
                if (index <= this.rating) {
                    star.classList.add('selected');
                } else {
                    star.classList.remove('selected');
                }
            })

            // enable the submit button
            if (this.rating !== 0 && this.review !== '') {
                this.submitButtonElement.removeAttribute('disabled');
            }
        }
    }

    onReviewDetailsChange(e) {
        this.review = e.target.value;

        if (this.rating !== 0 && this.review !== '') {
            this.submitButtonElement.removeAttribute('disabled');
        } else {
            this.submitButtonElement.setAttribute('disabled', '');
        }
    }

    submitReview() {
        this.addSubmittedReview(this.rating, this.review);
        this.resetRatingWidget();
    }

    resetRatingWidget() {
        this.resetStarState();
        this.resetReviewInputState();
        this.submitButtonElement.setAttribute('disabled', '');
    }

    resetStarState() {
        this.rating = 0;
        this.starsElement.forEach(star => star.classList.remove('selected'));
    }

    resetReviewInputState() {
        this.review = '';
        this.reviewDetailsElement.value = '';
    }

    addSubmittedReview(rating, reviewDetails) {
        const review = document.createElement('div');

        review.classList.add('review-item');

        let starHtml = '<div class="stars">';
        for (let i = 0; i < rating; i++) {
            starHtml += '<i class="fas fa-star"></i>';
        }
        starHtml += '</div>'

        review.innerHTML = `${starHtml} <div class="review-details">${reviewDetails}</div>`;

        this.reviewContainer.insertBefore(review, this.reviewContainer.firstChild);
    }
}

const reviewWidget = new ReviewWidget(stars, submitButton, reviewDetails, reviews);





