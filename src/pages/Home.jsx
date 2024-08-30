import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import appwriteService from "../appwrite/config";
import { Container, PostCard } from '../components';

function Home() {
    const [posts, setPosts] = useState([]);
    const navigate = useNavigate();

    useEffect(() => {
        appwriteService.getPosts().then((posts) => {
            if (posts) {
                setPosts(posts.documents);
            }
        });
    }, []);

    if (posts.length === 0) {
        return (
            <div className="w-full py-8 mt-4 text-center">
                <Container>
                    <div className="flex flex-col items-center justify-center min-h-[200px] bg-gray-100 rounded-lg p-4">
                        <h1 className="text-2xl font-bold text-gray-800 mb-4">
                            Welcome to Our Blog
                        </h1>
                        <p className="text-lg text-gray-600 mb-6">
                            Login to read interesting posts
                        </p>
                        <button 
                            onClick={() => navigate('/login')}
                            className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded transition duration-300"
                        >
                            Login Now
                        </button>
                    </div>
                </Container>
            </div>
        );
    }

    return (
        <div className='w-full py-8'>
            <Container>
                <div className='flex flex-wrap -mx-4'>
                    {posts.map((post) => (
                        <div key={post.$id} className='w-full sm:w-1/2 md:w-1/3 lg:w-1/4 px-4 mb-8'>
                            <PostCard {...post} />
                        </div>
                    ))}
                </div>
            </Container>
        </div>
    );
}

export default Home;
