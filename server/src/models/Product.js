import mongoose from 'mongoose';
import slugify from 'slugify';

const productSchema = new mongoose.Schema({
    name:       { type: String, required: true, trim: true },
    slug:       { type: String, required: true, unique: true, lowercase: true },
    brand:      { type: String, required: true },
    category:   { type: String, required: true },
    price:      { type: Number, required: true, min: 0 },
    specs:      { type: Map, of: String },
    inStock:    { type: Boolean, default: true },
    images:     [String],
    rating:     { type: Number, min: 0, max: 5, default: 0 },
    numReviews: { type: Number, default: 0 }
}, {
    timestamps: true
});

productSchema.pre('validate', function(next) {
    if (this.name && !this.slug) {
        this.slug = slugify(this.name, {
            lower: true,
            strict: true
        });
    }
    next();
});

productSchema.index({ slug: 1 });

export default mongoose.model('Product', productSchema);