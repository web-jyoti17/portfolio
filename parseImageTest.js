const projImageUrl = null;
const validImages = Array.isArray(projImageUrl) ? projImageUrl.filter(Boolean) : (projImageUrl ? [projImageUrl] : []);
console.log(validImages);
