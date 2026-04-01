import { useEffect, useRef, useState } from "react";
import { useParams, Link } from "react-router-dom";
import { getCharacterById } from "../services/Api";
import Loader from "../components/Loader";
import ErrorMessage from "../components/ErrorMessage";
import {z} from "zod";
import { useFormik } from "formik";

const evaluationSchema = z.object({
    username: z.string().min(3, "Ton nom est trop court"),
    email: z.string().email("Email invalide"),
    rating: z.coerce.number().min(1, "Minimum 1").max(5, "Maximum 5"),
    comment: z.string().max(200, "Max 200 caractères").optional(),
});

const Character = () => {
  const { id } = useParams();
  const [character, setCharacter] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const dialogRef = useRef<HTMLDialogElement>(null);
  const [submittedData, setSubmittedData] = useState<any>(null);
  const formik = useFormik({
    initialValues: {
      username: "",
      email: "",
      rating: 5,
      comment: "",
    },
    validate: (values) => {
  const errors: any = {};
  const result = evaluationSchema.safeParse(values);

  if (!result.success) {
    for (const issue of result.error.issues) {
      errors[issue.path[0]] = issue.message;
    }
  }
  return errors;
},
    onSubmit: (values) => {
      setSubmittedData(values);
      dialogRef.current?.showModal(); 
      formik.resetForm();
    },
  });


  useEffect(() => {
    if (id) {
      setLoading(true);
      getCharacterById(id)
        .then((data) => {
          setCharacter(data);
          setError(null);
        })
        .catch(() => {
          setError("Personnage introuvable");
        })
        .finally(() => {
          setLoading(false);
        });
    }
  }, [id]);

    if (loading) return <Loader />;
  if (error) return <ErrorMessage message={error} />;
  if (!character) return null;

  return (
    <div>
        <div>
        <Link to="/">Retour à la liste</Link>
      </div>

      <h1>{character.name}</h1>
      <img src={character.image} alt={character.name} width="200" />
      
      <ul>
        <li>Statut : {character.status}</li>
        <li>Espèce : {character.species}</li>
        <li>Origine : {character.origin?.name}</li>
      </ul>
      <hr />
      <section>
        <h3>Laisser une note sur ce personnage</h3>
        <form onSubmit={formik.handleSubmit}>
        <div>
            <label>Nom de l'évaluateur :</label><br />
            <input 
                type="text" 
                name="username"
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                value={formik.values.username}
            />
            {formik.touched.username && formik.errors.username && (
            <p style={{ color: "red" }}>{formik.errors.username as string}</p>
            )}
        </div>

        <div>
            <label>Email :</label><br />
            <input 
                type="email" 
                name="email"
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                value={formik.values.email}
            />
            {formik.touched.email && formik.errors.email && (
            <p style={{ color: "red" }}>{formik.errors.email as string}</p>
            )}
        </div>

        <div>
            <label>Note (1 à 5) :</label><br />
            <input 
                type="number" 
                name="rating"
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                value={formik.values.rating}
            />
            {formik.touched.rating && formik.errors.rating && (
            <p style={{ color: "red" }}>{formik.errors.rating as string}</p>
            )}
        </div>

        <div>
            <label>Commentaire (facultatif) :</label><br />
            <textarea 
                name="comment"
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                value={formik.values.comment}
            />
            {formik.touched.comment && formik.errors.comment && (
            <p style={{ color: "red" }}>{formik.errors.comment as string}</p>
            )}
        </div>

        <button type="submit">Valider</button>
        </form>
      </section>

      <dialog ref={dialogRef}>
        {submittedData && (
          <div>
            <h2>Évaluation enregistrée !</h2>
            <p><strong>Nom :</strong> {submittedData.username}</p>
            <p><strong>Email :</strong> {submittedData.email}</p>
            <p><strong>Note :</strong> {submittedData.rating}/5</p>
            <p><strong>Commentaire :</strong> {submittedData.comment || "L'utilisateur n'a pas laissé de commentaire"}</p>
            <button type="button" onClick={() => dialogRef.current?.close()}>Fermer</button>
          </div>
        )}
      </dialog>
    </div>
  );
};

export default Character;