import React from 'react'
import emailjs from 'emailjs-com'

export const Contact = () => {

    function sendEmail(e) {
        e.preventDefault();

    emailjs.sendForm(process.env.REACT_APP_EMAILJS_SERVICE_ID, 'reactbook', e.target, process.env.REACT_APP_EMAILJS_USER_ID)
      .then((result) => {
          console.log(result.text);
      }, (error) => {
          console.log(error.text);
      });
      e.target.reset()
    }

    return (
        <div>
            <h3>
                Contact
            </h3>
            <hr />
            <div className="row">
                <div className="col-md-6 offset-md-3">
                    <form onSubmit={sendEmail}>
                    <div className="form-group">
                            <input type="text" className="form-control" name="name" placeholder="Name" />
                        </div>
                        <div className="form-group">
                            <input type="email" className="form-control" name="email" placeholder="Email" />
                        </div>
                        <div className="form-group">
                            <select className="form-control" name="inquiry" id="">
                                <option disabled selected>Please choose one option</option>
                                <option value="cheap">Starting $500+</option>
                                <option value="expensive">Starting $1,000+</option>
                                <option value="luxury">Starting $5000+</option>
                            </select>
                        </div>
                        <div className="form-group">
                            <textarea className="form-control" name="message" id="" cols="30" rows="10"></textarea>
                        </div>
                        <input type="submit" className="btn btn-info btn-block" value="Send us a message" />
                    </form>
                </div>
            </div>
        </div>
    )
}

