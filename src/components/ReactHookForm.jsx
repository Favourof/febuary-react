/* eslint-disable no-unused-vars */
import { zodResolver } from "@hookform/resolvers/zod";
import { useState } from "react";
import { useForm } from "react-hook-form";
import z from "zod";
import { privateInstance } from "../api/api";
import { useNavigate } from "react-router-dom";


export const ReacHookForm = () => {
    const [loading, setLoading] = useState(false);
    const [disabled, setDisabled] = useState(false);
    const [preview, setPreview] = useState(null);
    const navigate = useNavigate()


    const productSchema = z.object({
        title: z.string().min(6, "tile must be atleast 6 character").max(18, 'Title must not be nore than 18').nonempty(),
        price: z.preprocess(
            (value) => (typeof value === "string" ? Number(value) : value), z.number().min(100, "Price must be greater than 99.9")),
        description: z.string().nonempty().min(10, "Description must be 10 character long"),
        image: z
            .any()
            .refine((files) => files?.length === 1, "Image is required")
            .refine(
                (files) => files?.[0]?.type.startsWith("image/"),
                "File must be an image"
            )
            .refine(
                (files) => files?.[0]?.size <= 5 * 1024 * 1024,
                "Image must be less than 2MB"
            ),
    })


    const { register, handleSubmit, formState: { errors } } = useForm(
        {
            resolver: zodResolver(productSchema)
        }
    )
    // console.log(errors);

    const handleImageChange = (e) => {
        const file = e.target.files?.[0]
        if (file) {
            setPreview(URL.createObjectURL(file))
        }
        console.log(file);

    }


    const onSubmit = async (data) => {
        console.log(data.image?.[0]);
        const formdata = new FormData()

        formdata.append('title', data.title)
        formdata.append("description", data.description)
        formdata.append("price", data.price)
        formdata.append('image', data.image?.[0])

        // console.log(formdata);



        try {
            const response = await privateInstance.post("/product", formdata)
            console.log(response.data.message, 'response');

            if (response) {
                navigate('/product')
            }

        } catch (error) {
            console.log(error.response.data.message);

        }



    }

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
            <form onSubmit={handleSubmit(onSubmit)} style={formStyle}>
                <h2>Product Details</h2>

                {/* Title Input (string) */}
                <div>
                    <label htmlFor="title">Title:</label>
                    <input
                        type="text"
                        id="title"
                        name="title"
                        style={inputStyle}
                        {...register("title")}
                        required
                    />
                    {errors.title && <p style={{ color: "red", fontSize: "10px" }}>{errors.title.message}</p>}
                </div>



                {/* Price Input (number/float) */}
                <div>
                    <label htmlFor="price">Price (float):</label>
                    <input
                        type="number" // Use type="number" for numeric input
                        step="0.01"    // Allows for float input (e.g., two decimal places)
                        id="price"
                        name="price"
                        {...register("price")}
                        style={inputStyle}
                        required
                    />
                    {errors.price && <p style={{ color: "red", fontSize: "10px" }}>{errors.price.message}</p>}

                </div>

                {/* Description Input (string/textarea) */}
                <div>
                    <label htmlFor="description">Description:</label>
                    <textarea
                        id="description"
                        name="description"
                        rows={4}
                        style={inputStyle}
                        {...register("description")}
                        required
                    />
                    {errors.description && <p style={{ color: "red", fontSize: "10px" }}>{errors.description.message}</p>}
                </div>


                {/* Image Input (string/URL) */}
                <div>
                    <label htmlFor="image">Image URL:</label>
                    <input
                        type="file" // Use type="url" for URL validation
                        id="image"
                        name="image"
                        style={inputStyle}
                        {...register("image")}
                        placeholder="e.g., https://example.com/image.jpg"
                        onChange={handleImageChange}
                        required
                    />
                    {preview && <img src={preview} width={"100%"} height={150} />}
                    {errors.image && <p style={{ color: "red", fontSize: "10px" }}>{errors.image.message}</p>}
                </div>

                <button disabled={disabled} type="submit" style={buttonStyle}>
                    {loading ? "loading" : "submit"}
                </button>
            </form>


            {/* {
                productRespobse && <ul>
                    <li>{productRespobse.title}</li>
                    <li>{productRespobse.description}</li>
                </ul>
            } */}
        </div>
    )
}
