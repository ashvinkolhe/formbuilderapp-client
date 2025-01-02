import React, { useEffect, useState } from 'react';
import Styles from './FormSubmit.module.css';
import { useParams } from 'react-router-dom';
import Api from '../../Api/Api';
import Text from '../../components/Bubbles/Text/Text';
import Image from '../../components/Bubbles/Image/Image';
import Video from '../../components/Bubbles/Video/Video';
import Buttons from '../../components/Inputs/Buttons/Buttons';
import InputText from '../../components/Inputs/Text/Text';
import Rating from '../../components/Inputs/Rating/Rating';
import { toast } from 'react-toastify';
import Loading from './../../assets/Loading/loading.gif'

function FormSubmit() {
    const { FormId } = useParams();
    const [form, setForm] = useState({ name: '', elements: [] });
    const [renderPage, setRenderPage] = useState([]);
    const [currentIndex, setCurrentIndex] = useState(0);
    const [userInputs, setUserInputs] = useState([]);
    const [firstValueChange, setFirstValueChange] = useState(false);
    const [submitted, setSubmitted] = useState(false);
    const [loading, setLoading] = useState(false);  // Loading state

    const fetchForm = async () => {
        setLoading(true);  // Start loading
        try {
            const response = await Api({
                endpoint: `/public/forms/${FormId}`,
                method: 'get',
            });
            setForm(response.data.form);
        } catch (error) {
            console.error('Error fetching form:', error);
        } finally {
            setLoading(false);  // Stop loading
        }
    };

    const startCountUpdate = async () => {
        try {
            await Api({
                endpoint: `/public/forms/start/${FormId}`,
                method: 'post',
            });
        } catch (error) {
            console.error('Error starting form count:', error);
        }
    };

    const viewCountUpdate = async () => {
        try {
            await Api({
                endpoint: `/public/forms/view/${FormId}`,
                method: 'post',
            });
        } catch (error) {
            console.error('Error updating view count:', error);
        }
    };

    const completeCountUpdate = async () => {
        try {
            await Api({
                endpoint: `/public/forms/complete/${FormId}`,
                method: 'post',
            });
        } catch (error) {
            console.error('Error completing form count:', error);
        }
    };

    const submitForm = async (e) => {
        e.preventDefault();
        if (submitted || loading) return;  // Prevent double submission

        setSubmitted(true);
        setLoading(true);  // Start loading during form submission

        try {
            const response = await Api({
                endpoint: `/public/forms/submit/${FormId}`,
                method: 'post',
                data: { data: userInputs },
            });

            if (response.status === 201) {
                toast.success('Form submitted successfully');
                completeCountUpdate();
            }
        } catch (error) {
            setSubmitted(false);
            console.error('Error submitting form:', error);
            toast.error("Error submitting form. Please try again.");
        } finally {
            setLoading(false);  // Stop loading
        }
    };

    useEffect(() => {
        fetchForm();
        viewCountUpdate();
    }, []);

    // Handle saving input
    const handleSave = (value, label) => {
        setRenderPage((prevData) => [
            ...prevData,
            { type: 'userMessage', value, label },
        ]);

        setUserInputs((prevInputs) => [
            ...prevInputs,
            { label, value },
        ]);

        setCurrentIndex((prevIndex) => prevIndex + 1);
        if (!firstValueChange) {
            startCountUpdate();
            setFirstValueChange(true);
        }
    };

    useEffect(() => {
        if (form.elements.length > 0 && currentIndex < form.elements.length) {
            const element = form.elements[currentIndex];

            const isAlreadyRendered = renderPage.some(
                (item) => item.element && item.element.label === element.label
            );

            if (!isAlreadyRendered) {
                if (element.superType === 'Bubbles') {
                    setRenderPage((prev) => [
                        ...prev,
                        { type: 'bubble', element },
                    ]);
                    setCurrentIndex((prevIndex) => prevIndex + 1);
                }

                if (element.superType === 'Inputs') {
                    setRenderPage((prev) => [
                        ...prev,
                        { type: 'input', element },
                    ]);
                }
            }
        }
    }, [currentIndex, form]);

    // Check if the form is fully completed
    const isFormComplete =
        form.elements.length > 0 &&
        userInputs.length === form.elements.filter((el) => el.superType === 'Inputs').length;

    return (
        <div className={Styles.super}>
            <div className={Styles.container}>
                <h1>{form.name}</h1>

                {/* Loading indicator */}
                {loading && <div className={Styles.loading}>
                    <img src={Loading} className='loading' alt='loading' />
                </div>}

                {renderPage.map((item, index) => {
                    if (item.type === 'input') {
                        const element = item.element;
                        return (
                            <div key={index} className={Styles.inputs}>
                                {element.type === 'Buttons' && (
                                    <Buttons
                                        label={element.label}
                                        choices={element.buttonValues}
                                        onSave={handleSave}
                                        disabled={submitted || loading}
                                    />
                                )}
                                {['Text', 'Date', 'Number', 'Email', 'Phone'].includes(element.type) && (
                                    <InputText
                                        type={element.type}
                                        label={element.label}
                                        onSave={handleSave}
                                        disabled={submitted || loading}
                                    />
                                )}
                                {element.type === 'Rating' && (
                                    <Rating
                                        label={element.label}
                                        onSave={handleSave}
                                        disabled={submitted || loading}
                                    />
                                )}
                            </div>
                        );
                    }

                    if (item.type === 'bubble') {
                        const element = item.element;
                        return (
                            <div key={index} className={Styles.bubbles}>
                                {element.type === 'Text' && <Text content={element.value} />}
                                {['Image', 'Gif'].includes(element.type) && (
                                    <Image image={element.value} />
                                )}
                                {element.type === 'Video' && <Video video={element.value} />}
                                {!['Text', 'Image', 'Gif', 'Video'].includes(element.type) && (
                                    <div>{element.label}</div> // Fallback for unsupported types
                                )}
                            </div>
                        );
                    }
                    return null;
                })}
                <button
                    className={!isFormComplete || submitted ? Styles.pending : Styles.submit}
                    disabled={!isFormComplete || submitted || loading}
                    onClick={submitForm}
                >
                    Submit
                </button>
            </div>
        </div>
    );
}

export default FormSubmit;
