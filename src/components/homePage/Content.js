import { useNavigate } from "react-router-dom";
import "../../assets/css/Content.css";

export default function Content() {

    const navigate = useNavigate();



    return (
        <section class="study-section">
            <div class="container">
                <h1>How do you want to study?</h1>
                <p>Master whatever you’re learning with Quizlet’s interactive flashcards, practice tests, and study activities.</p>
                <div class="buttons">
                    <a href="#" class="btn primary" onClick={() => navigate("/register")}>Sign up for free</a>
                </div>
            </div>
        </section>
    )
}