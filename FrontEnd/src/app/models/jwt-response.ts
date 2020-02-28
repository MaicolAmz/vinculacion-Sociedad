export interface JwtResponseI {
  id: string;
  idConvenio: string;
    dataUser: {
        id: string,
        nombre: string,
        apellido: string,
        email: string,
        accessToken: string,
        expiresIn: string
    };
}
