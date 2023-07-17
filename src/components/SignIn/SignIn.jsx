import styles from './Signin.module.css'
import img from '../../assets/img.png'

export const SignIn = () => {
    return (
<div className={styles.content}>
    <form action="/" className={styles.form}>
        <h1 className={styles.signH1}>Sign in</h1>
    <div>
        <label htmlFor="email" className={styles.label}>
            Email
        </label>
        <input name="email"
               type="text"
               placeholder="Email"
               className={styles.input}/>
    </div>
    <div>
        <label htmlFor="password" className={styles.label}>
            Password
        </label>
        <input name="password"
               type="text"
               placeholder="Enter password"
               className={styles.input}/>
    </div>
        <input type="submit" value="Log in" className={styles.submit}/>
        <a href="">Forgot password?</a>
    </form>
    <div className={styles.image}>
        <img src={img} alt=""/>
    </div>
</div>
    )
}