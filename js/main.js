import {showUsersPictures} from '/js/pictures.js';
import {watchClickThumbnail} from '/js/full-image.js';
import {similarPosts} from '/js/utils.js';
import '/js/form.js';

const posts = similarPosts();
showUsersPictures(posts);
watchClickThumbnail(posts);
