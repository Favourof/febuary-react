import React, { useState } from 'react'

export const AddProduct = () => {
    const [loading, setLoading] = useState(false);
    const [disabled, setDisabled] = useState(false);
    const [productRespobse, setproductRespobse] = useState(null);

    const [formData, setFormData] = useState({
        title: '',
        price: '', // Stored as a string initially to handle float input gracefully
        description: '',
        category: '',
        image: '', // Stored as a string (URL)
    });


    // Handle input changes dynamically for all fields
    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({
            ...formData,
            [name]: value,
        });
    };

    const handleSubmit = (e) => {
        e.preventDefault(); // Prevent default browser page refresh
        console.log('Form Submitted:', formData);
        setDisabled(true)
        setLoading(true)
        try {
            fetch('https://fakestoreapi.com/products', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(formData)
            })
                .then(response => response.json())
                .then(data => { console.log(data, 'here is the product response'), setproductRespobse(data), setLoading(false), setDisabled(false) });

        } catch (error) {
            console.log(error);
            setLoading(false)
            setDisabled(false)

        }
        
        // Process the data (e.g., send to an API)
        // Note: The price should be converted to a float/number type when processing, 
        // using something like `parseFloat(formData.price)`
    };
    const formStyle = {
        display: 'flex',
        flexDirection: 'column',
        maxWidth: '400px',
        margin: '20px auto',
        padding: '20px',
        border: '1px solid #ccc',
        borderRadius: '5px',
        gap: '10px',
    };

    const inputStyle = {
        padding: '8px',
        borderRadius: '4px',
        border: '1px solid #ccc',
        width: '100%',
        boxSizing: 'border-box',
    };

    const buttonStyle = {
        padding: '10px 15px',
        backgroundColor: '#007bff',
        color: 'white',
        border: 'none',
        borderRadius: '4px',
        cursor: 'pointer',
    };
    return (
        <div>
            <form onSubmit={handleSubmit} style={formStyle}>
                <h2>Product Details</h2>

                {/* Title Input (string) */}
                <div>
                    <label htmlFor="title">Title:</label>
                    <input
                        type="text"
                        id="title"
                        name="title"
                        value={formData.title}
                        onChange={handleChange}
                        style={inputStyle}
                        required
                    />
                </div>

                {/* Price Input (number/float) */}
                <div>
                    <label htmlFor="price">Price (float):</label>
                    <input
                        type="number" // Use type="number" for numeric input
                        step="0.01"    // Allows for float input (e.g., two decimal places)
                        id="price"
                        name="price"
                        value={formData.price}
                        onChange={handleChange}
                        style={inputStyle}
                        required
                    />
                </div>

                {/* Description Input (string/textarea) */}
                <div>
                    <label htmlFor="description">Description:</label>
                    <textarea
                        id="description"
                        name="description"
                        value={formData.description}
                        onChange={handleChange}
                        rows={4}
                        style={inputStyle}
                        required
                    />
                </div>

                {/* Category Input (string) */}
                <div>
                    <label htmlFor="category">Category:</label>
                    <input
                        type="text"
                        id="category"
                        name="category"
                        value={formData.category}
                        onChange={handleChange}
                        style={inputStyle}
                        required
                    />
                </div>

                {/* Image Input (string/URL) */}
                <div>
                    <label htmlFor="image">Image URL:</label>
                    <input
                        type="url" // Use type="url" for URL validation
                        id="image"
                        name="image"
                        value={formData.image}
                        onChange={handleChange}
                        style={inputStyle}
                        placeholder="e.g., https://example.com/image.jpg"
                        required
                    />
                </div>

                <button disabled={disabled} type="submit" style={buttonStyle}>
                    {loading ? "loading" : "submit"}
                </button>
            </form>


            {
                productRespobse && <ul>
                    <li>{productRespobse.title}</li>
                    <li>{productRespobse.description}</li>
                </ul>
            }
        </div>
    )
}
