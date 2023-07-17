import styles from './Signup.module.css'
import img from '../../assets/img.png'

export const SignUp = () => {
    return (
        <div className={styles.content}>
            <form action="/" className={styles.form}>
                <h1 className={styles.signH1}>Create an account</h1>
                <div className={styles.nameBox}>
                    <div>
                        <label htmlFor="firstname" className={styles.label}>
                            First name
                        </label>
                        <input name="firstname"
                               type="text"
                               placeholder="First name"
                               className={styles.input}/>
                    </div>
                    <div>
                        <label htmlFor="lastname" className={styles.label}>
                            Last name
                        </label>
                        <input name="lastname"
                               type="text"
                               placeholder="Last name"
                               className={styles.input}/>
                    </div>
                </div>
                <div className={styles.test}>
                    <label htmlFor="companyname" className={styles.label}>
                        Company name
                    </label>
                    <input name="companyname"
                           type="text"
                           placeholder="Company name"
                           className={styles.input}/>
                </div>
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
                <div>
                    <label htmlFor="repeatpassword" className={styles.label}>
                        Repeat password
                    </label>
                    <input name="repeatpassword"
                           type="text"
                           placeholder="Repeat password"
                           className={styles.input}/>
                </div>
                <input type="submit" value="Log in" className={styles.submit}/>
                <span>Already have an account? <a href="">Log in</a></span>
            </form>
            <div className={styles.image}>
                <img src={img} alt=""/>
            </div>
        </div>
    )
}