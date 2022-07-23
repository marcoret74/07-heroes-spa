import { render, screen } from "@testing-library/react"
import { MemoryRouter, Route, Router, Routes } from "react-router-dom";
import { AuthContext } from "../../auth";
import { PublicRoute } from "../../router/PublicRoute"

describe('Pruebas de <PublicRouter/>', () => {

    test('debe de mostrar el children si no está autenticado', () => {
        const contextValue = {
            logged: false
        };
        render(
            <AuthContext.Provider value={contextValue}>
                <PublicRoute>
                    <h1>Ruta Pública</h1>
                </PublicRoute>
            </AuthContext.Provider>
        );

        expect(screen.getByText('Ruta Pública')).toBeTruthy();

        //screen.debug();

    });

    test('debe de navegar si está autenticado', () => {
        const contextValue = {
            logged: true,
            user: {
                name: 'Strider',
                id: 'ABC123'
            }
        };
        render(
            <AuthContext.Provider value={contextValue}>
                <MemoryRouter initialEntries={['/login']}>
                    <Routes>
                        <Route path='login' element={
                            <PublicRoute>
                                <h1>Ruta Pública</h1>
                            </PublicRoute>
                        } />
                        <Route path='marvel' element={<h1>Página Marvel</h1>} />
                    </Routes>

                </MemoryRouter>

            </AuthContext.Provider>
        );

        expect(screen.getByText('Página Marvel')).toBeTruthy();

        //screen.debug();
    });
})
