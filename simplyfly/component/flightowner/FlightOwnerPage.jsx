import React from "react";
import { Link } from "react-router-dom";

export default function FlightOwnerPage() {
  const cards = [
    {
      title: "Route List",
      link: "/route-list",
     desc: "Easily select route and add new routes for flight bookings.",
     img:"https://media.istockphoto.com/id/691423398/vector/winding-road-on-a-white-isolated-background-with-pin-pointers.jpg?s=612x612&w=0&k=20&c=PaRJPzxTEMgSc09prPpitCxGPMUcqMtwPSV4FxNfrGw="
    },
    {
      title: "My Flight Booking",
      link: "/myflight-booking",
      desc: "Search your flights and see bookings.",
      img:"data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/2wCEAAkGBxASEBUQEBAVFRUQFRAPFxUVFRcQFRAVFRUWFhUYFhcYHSggGRolGxYVITEhJSkrLi4uFyAzODMuNygtLisBCgoKDg0OGxAQGi0lICUrLS0tLS0tLSstLS0rLS0tLS0tLS0tLS0tLS0yLS0tLS0tKy0tLS0rLS0tLS0tLTc3Lf/AABEIAJMBVwMBIgACEQEDEQH/xAAcAAABBQEBAQAAAAAAAAAAAAAAAQIDBAUGBwj/xABMEAABAwIDAwoCBgUICQUAAAABAAIDBBEFEiEGEzEHIjJBUWFxgZGxodEUM0JScsFDU2J0kggjJIKisrTwFRclNTZUk8LSFoTh4vH/xAAaAQADAQEBAQAAAAAAAAAAAAAAAQIDBAUG/8QAKxEAAgIBAwMEAgEFAQAAAAAAAAECAxEEEjEFIVETFDJBImEjQkNSgaEV/9oADAMBAAIRAxEAPwC8Gp2ROCcF7x8oiPImOYrNkwhGQZVc1MU7woXBUjNiXSFORZMQyyLJ9kWQIZZFk9CMgNsiyciyAGoTkWQMYAiyfZFkCI7JbJ2VLZADCEllJZJlQA2yLJ6EAMsiyfZCAGWQAnWSoAZZJZSWSZUANsghPsiyAI7JbJ2VLZADCEAJ9kWQAyyLJ9klkANARZPQgCOyWydZKgB9IOePP2KE+k6Y8/YpFJoh4cnhyiQkLJNmSEqO6LowPIOCjIUiQhMRHlQn2SWQIahOsiyMiGoTrIsgBqE6yCEDGoTrIsjIDUJ1kWRkQ1CdZFkZAahOsiyMgNQnWRZGQGoTrIsgBqE6yLIAahOsiyYDUJ1kNbfgL+GvslnHI0s8DUWVltDMeEMh8GO+SV9DMOMUg8WOH5Jb4+StkvBVQnlqSyaeSBqE6yLIAahOsiyAGoTrIsgB9J0x5+xQn0g548/YoSZaG2RZOIRZBA2ytYbQGZ+QPa3r5xsT+EdZVeyC1KSbWEOLSeXwdIdkhb67X8Gnuq0myk32ZIz4lzfyWZBWys6Ejh4ONvTgr8O0VQOllf4tt/dsuZwvXDyd0bNLLmLRFJs7VD9GD+FzXfmqsuGTt6UL/wCEn2W7FtQ37cRHe05vgQFfg2gpz+kLT+0HD4jRQ7ro8xNVp9NP4zOJc0jQgjxFimr0VlW1/B7H+bXKOWihPSgjP9UA/CyPeY+UQfTM/GaZ5/ZC7aTBaU/oSPwvcPgVVl2cpzwfI3ya4fkrWsgZy6bauDk7LKnlMNQHtF8pa/KdWu11BHYbFdhiWBsibmE9y4tY1mQh0j3aNa3XiVqYVsfALSVTBI+wGW942ddrfaIudT6JW6mDj2ZrpNJZGf5Lsc1iMbcwfH9XK0Ss7mniPI3CqgK5t7tvJQVMdHS08JDY2yuDmm3Pc7K1uUjKOade9aWD18OJU293W7lbzXN0JY+1+kAMzD2/mLLOvWcJoq/pr7yi/wDRg2QAtOGhzODGi7jrlGpt2nsHeVqu2aDGGSaZsbWAvceIaBqSSSAAB1rplfBcs4IaW2XCOXsiy3aXC6WoaXUldHNl45LPA8S1xssurpXxOLHixGvcR1EdyqFsJ/Fiu09lXyRXsiydZC0MBlkoCWyVADbJLK5S4fNL9XG51+sDT1Oi2KXZGV1jI9rO4c8/JZyuhHlm1entn8Uc3ZOjjJNmgk9gF/Zd3SbLUzNXAvtrzjp6BOfjdBACBJGMuS4jGawebNPNHD/PYueWsS+KO2vpk38ng5al2bqn/o8o7XnL8OPwWxS7Gt4yyk9zBlHqbqwdopZHOjp6SQkOqIs7+awPjbdt+1rie0JssGIzMc10zIM8cJBYMzo5QQZBpxB1HHs71zS1Vkv0d1fTqY89y/BgVLHwhDj+1zz/AGtAtGJjR0WhttLABtvRRvkGoOtwOPA6WKYJxrbuWDm3yzrjVCPCLRKwztE7O5jKKpOVzmZsga02cRcEnUdavuqUw1XelkvBk406SRzmHDXPykhsjZI2kjqLSdR4FcvWYbNEAZYnMDiQLlrvi02vZd79LHamzPZI0seAWu0IP+dCtqr5Vv8ARyanRxtXbk87sgBXsUodzIWXuNHNPa08D/nsVSy9dNSWUfOSTi9r+hlktk6yLJk5G2SWT7IsgY6lHPHn7FKnUo548/YoUspDSEWUhbqjKqyQRgJcqflQGpZFkjyoyqTInBiWRkOVAarAYE9tkZGkV2xK7TSzM6Mjh/WNvQpoPYE8B3Ys5YfJrCTjwzQhxeYdItd4t/MWVtuNC3Oj9D81jBhTmx96xlRB/R1Q1dseGNrMVjOJ0ubRmSVrc2gErgR4X6I8wu1Ey4esw6GZmSVtxxB4Fp7QepUa7EKqjjbu6kytvkAnY2VzRa457bE8Otc1mnafbg9PT6yM0lLk0OUDZM1jmVEJG9jbu3NcQBIy9xY9TgSeOlj3Kls7TyYdTSTTMAkldHFHHcEueA7LfKSLXJ8h3hZc22Fa4Wztb+BgHvdTCtqK6mdBmzVFO9tVFo1plDQWvZpYZhcEdvBZSpklk61NN4PSsHpBEyznZ5HWdI88ZH21PgDew4ALE5UaeSXCahkXH+ZkIHFzGSsdJ/ZBPkjAdqYahoBcI5m6SQv/AJtzXjjYO1Iutp09hrp48Pis2UfP2zTnwTsqIiQ5h6vttvzmntBA4L3OuwptQ0EvDC0mxsDcEcPX3WONi6ETCdjHNAIdu2OaIXW4DKWkgcNAbLfkcT8uxOMnF5RNkI2R2yMh+yb/ALMzD43HzUTtlJvvx+p+S2AEuVb+7s8nG+nUeCjS7Kxj62a/c2wHqdVafJh1LcHJmY6Nh4yPYZL5b9gNjr3KZrVYia0nnMa7hxaDwNxxHUdQs5XTlyzevS1Q4RprIxk1pfkpt21jo33kdxZJfm246eR49y1C9RPnWR0GIzZxz3iSpqnyEPZKGN5jGnIWvaO491tPEq7RYNSwNyxwsFgG3IzkgOzC5dx118grD5ioSXFAFiScKB9UsbE8ep4dHPzO+6znm/f1DzK5ev2tmfpE0RjtPPd8dB6ea0VcmRKaR29RWNaMz3Bo+84ho9SsKt2tpm6NcZDw5guPU2C4eeV8hvI9zz2uJcfUqPItlQlyZO5/R0lRtm8/Vwgd7nF3wFlQk2oqzwcxv4WD/uusuwSFwVquK+jN2SNAbRVn63+wz5KeDaWrB1cx3cWf+Nlm00D5Og3T7x0H/wA+S16ShazXi7t4W8B1LSNKf0c92sVa57lypq3ykPkADsrW2F7C3j5qKyfZLlXZGOFhHhzm5ScmR2RZPIRlVEjLIsn2RZIB1MOePP2KE+nHOHn7FCTKQWRZPsiyRIyyUBOslQAgjKe2HvTdUiQ00ShjOspc7R1KGyCEYHuJvpA7EhqFFlUkEpabgDzF0mioyy+4hqE01BV9mJu62A/D3upWYjH1x/2WlYucl/SdKrrf9z/hkmQnrWXtCLw+Dm/mPzXYtqqY8WM82W9k51NSyjKYonDrAJHsVEtR9OLOijSfmmppnl9HSSSuDImF7j1N7O09g7yu82b2IkikZPNPkcw5gyMX8Q5x0tbTQHxW7QU0MLcsUQYCbnKTr4k6lW98Ox3qPkuWdzfZHsxhgjxmHDhZ1XHC4lr7b1okc4MF3ZQeOnYsmDEqQX+g4cHlu4N2xthBbLfnAht9LW6uK0pY2Pe1z2BxjvkJFy3MLO9QrUT7ANGgGgAsAB2ADgFgaYIMNbUvYDURNY/nXDXh3BxA014ixvf0UpjVhr0p1QBW3acI1NZODUARtjT8qiqayKMXkkYwD7zg33Kw63bSij6LzIexg0/iNgmot8CckjoSoppGtbme4NaOsmw9VwGI8oErriFjYx2n+cd5cAPQrma3FpZTmle55/aN7eA6vJaxpb5M5WpHoeJbYQM5sQMru3VjPU6nyHmuTxTaGomuHSZWn7DOa35nzKxYYZ5OhE93g0kevBaVPsvWP1IawftO/wDG61UIxRk5uX2Ud4AmOqAulptih+lnPgxtvifknY7glNTUkkrIy57Q0Bz3F+XM4Nvbhpfs7EO1Aq2/s5UVFzlAuT1DUnyCMSEsEYlnjfGxxyNL2ubmda9gDqdATwXsuDU8MUTBC1oGRnOaBd2g1JHG/HzXOcqGByVlKzdDM+nfvQziZAQWuyjrdqCB12txIBzdz+jRVeTlNm8CFbDvo6lmmhYGuztd1NdmtlvbQ2IPxV6LCYmHo3I63an04KvybUropJpHAsjZHaRzgWgEOBaHXGhHO04rvKHAhIXSzXGcueI+BAJuM/f3DgtKr0s7jk1enslhVs5UhLlVafbGlZXy0b6K0UUpp98HuzBzTlc5zfu3vqDe2q2MSo92+w4HUdfXYi/kuqrURm8I8q/RWVLc+5RsiyfZFl0ZOMZZJlT7JbIyBHlRlUlkWSyAQDnDz9kKSnbzh5+yEikFkZVKWpA1LIsEZajKpcqQtQPBHlQWqXKjKjIsEOVFlNlRlRkeCKyLKXKkyoyLBHZJZS5UWQGCOygqopSLxSlhHVYOa7xB9wrdkWSklJYZpXOVb3ReDEdiOIx8Y2PA62gm/k03+Cj/APWMrTaSHX8Tm/Ahb+VI6MHQi/cRdYPTQZ6EOpTXyWTJj26txgPk8fJTt2/b+od/GPkp5MMgdxhZ/CB7KB2A036r0c75qPbRNl1JfaH/AOsO3Cn9ZP8A6qJ/KHL9mBg8S53tZKNnqX9Wf43/ADT24DSj9EP4n/NL24//AEI/szptvKx3Asb4MH/cSs6THa6Y230ru5hIHoxdbBh8DejTx+bA73WnFUPAs1oA7AMvwCHVjhFLW1vls89jwerkNywi/W9wb631V6DZN5+slaPwgu97LtjKT0mhRGIdv5q4R8oxt1L5gzAp9l6ZvSLnnvOUejVp09BAzoRMHflBPqdVcEbe1PDQrwjldtj5ZHcnglDCVJmCQzIFnyxWw96Kmma9jo36teC0g8CFEZyonPcl6eeRq5rjJDh0dRSjdxTNlib0WTAtfGPuiRt7jxaVoDGJPtMYD3Pc73aFRIKQxlL28C3rrsYRHtHWTSwlrACWuilDb2D8jw7KfGy3sP2oppGg70Md1xyndPYesEOt19Y0PasXdlG7Kmemi+OxdXULILElkr49s3RT1BqhNkLy0yNYBIJCLDMLHmuIFieHX233jizD1OA4WIusjIUZU46aC+xT6lbJ9kjTdUUzuLRf8GU+oCiNPTO4Py+fzCo5UZVaqxxJmT1W75QRadhjD0ZmnuNh7FU56csNiQfwnMlyoyq4prlmE5Qa7RwR2RZS5UZVZjgSnHOHn7IUtOznDz9kJZKSHZEZVLlS5VOTTaQZUZVPlRlRuDaQZUZVPlRlSyG0gyoyqbKjKjIbSHKsHazbejw6oFNLTSyu3cUpe2RrBzxe1iO5dIWrx7lx/wB6j92pv7pXNqJtYwz0en0wk3uWTo/9buH/APIVH/Wb8l1GP7S0dJQ01e+GZza0McyNr2gsuzOQ5xHsuQocW2REUYkpnF4ZGHndym7w0ZjpJ23Vzlvh3eHUkTWtbHHO5kLWXAEO5BjvmJN7HVc3qz8npe2q/wAUdXheK09RQNxIg08OWeR4c7eljYpCzSwuSTbRRYHjNHXRPlo5Hu3JDXskbu3tDiQ11gSC02//ABY2xzoBs001TXPpxT1+8Yywe4fSgGlpJsHA6i6rcljqJ0FUzDmVDXB9IZH1Bjc6RpcQGNDAA0A3PbqtIXSyu5hbo6tsml3OvyossHabb3D6GV1O5slRMzSQRkMjiOhyl56R16r24KDC+UvC55IohFVMfM9kQFo3Na57g0XN9Rcro9zE89dPtayXtrdqqXDWw76CWV9Qx8gyOaxrQ12XW4utannZLDBPG0sFRDFPkJzFmcXtfrXnn8oGPLLRtv0YqhvpLZWMN5TsPgpqWEwTyuipoIHuaWxtaWtNw0O1OpOvBc8bmpZb7HdZo1KlRiu537IiTYC5PADW6suoZALmM6C+pF7dtuKoTbQUsOHnFmF76dzQ1gaAJA57jEQ4E6Frl4psDta2krvpNW6aVu6mh0dndzwOGc9y0lqe/Ywq6f8Ai3Lk9zD0k9Y2KGaokBc2mikqC1pDS/IL2BPBSFrSGPZfLIxkrc1rgPAIBt1qjtCP9nV/7nUey1nL+PKOaitq5Ql5OQPLDh//ACE//VZ8l0OzG1lDiJMdMZI5mgv3M2W8gAud25ps6w6jYryjk5xvDaV07sRphOHsYI2mJk1nBxLrZ+jcWFwr3JZRmTFTXRM3dPRGaqk1uY43NkDIwOLib5fAFcStmnyexPS1Si1g9iY1TtjWVi+0VLRU0dRVucDMLxwss6SU6E2vwaL8TpwWDh3K9hr5AyWCeFpNt5zZQ3vc1utvC66nfE82Gim+52wg7k76MrckkTIjO+VghazfGW4ybu18wPWLdnavPavlmw5khbHSzyMBtnu2MuHaGnX1sod6Lho5SO6how5wb2kBcphW3NHPiQw1lLKHGWaAyue2wMYeSQ0DW5Yus2Rx2lr421FI8kNc1j2OGV8TtDZw9iNF4lsT/wAUj97rvadZztbfZnVTpIpPcj2gU3csbHdp8Nop2U1VM9skga/mszNha6+UyHq4dV/zUOGcoNBJVsw+njqKh4eIBJGGZHZdHPuSOYLE37AuZ5X5cIbiLfpUNU+ZscLnbl0bIp26lodmuQbaXFtCnK947E1aKKeZI9Iko7G3HhqNQQRcEeShNMoNq9poMNjbPVNkcyeTJE2INvG0RNcAbnq4Ll63ljwxrWGKCeRzxdzTlj3WtrEnpHr0014q1qPJlLQNvsdY6mUboVY2XxmnxGnFTS5rZjE5j9HRPABym2hFiDcLktoOVDDaaZ0LI5agxkte+MtjjBBsQ0npW7eCv3CwZexk3hHQliTJ3LG2d2/w6tqYqWKOpbJOSBmDMrSGudqQe5dM6FaRuUuDmt0k6+SjlRlVzcpDEr3GHpsqZUZVZ3STdp7hbGRwN5w8/YoU0TOcPP2QlkraTbpG6V4Rp25WO861SZ5j7km77lp7hJ9HS9QfoGbu0oiWj9HQIE/UD0DO3STdLSMCaYEeog9AzjGvFuXP/ev/ALam/ule8GBcJyi7FUlVUCrnqZoyWRw5Y4N90ARe48Vjc92MHXo4qtvJgSbBYWwRtdBXyOdDBM50Tosl5GBxAzWKk5Zqt0uG0r3RmP8ApMjWscQXNayINbmtpcgX8132DTCRuZjXhjGxQt3jcjniNgbmLeq9uCo7dbOQV1KyOeZ8TYHumvHHvS67ctrKHD8co2jqP5Wnwcxg3/CTv3et/wAY1Vv5PA0ru0CmI/EDIW/Gy6LA8Ppn4e7CY3z7oQzRmd8W7deWYS6MJ1ta3mqmxGF01BI+CllqJX1MlMHOfBumRbp5JN763vawWe1m/qR8nnHJjTwz4sxtaA8u37wyXRss4a5zWyX77m3WQB1qbG4YmbS5IWtaxtfTBoZbKOfHe1tON1q7Y0WBTV9R/SpqGWOWRsjTDv4pHtdq+Ldm7b2vY9ZXMbMUDJcZp4qMvkjFVC5r3tyucyNwc97gOAs0nwUmp2H8oL66l/DWf4hyq7b7P0sGz2G1EULWzTOYXyAc+TeRPe4OPWLgW7LLtNutn6TEmR1E1RLEITUMAji32dr5nODtD2WRieE0lfhkNEZKiOLDzFllMPOnyxll93e44/BVtZmrIeSLkugjmwOOmnibJHLJXOLXC4vHlcwjwK825J6CGevc2eFkzW01TKGSC7S9jbtv5r1jYeOCnZFSU5mkjgNRI6SWPc5t9YZQDroAdfBc9QbJ0mGV4qYq+YWLiI/ojpgY36FjyNCLadSbiyVbHL7nY4Xvi0unDGkhgayPRkbGizWtv1fNN2lH+za79zqPZaMUrJBnjaWtdcgEWIHeElbSNmgnp3uLW1EUkBcBmLM4te3WuqS/DCPLg/5tz8niXJVh2HzGp+ntgIYyIx7+Y0zRd5EhDmkG4bqo9m5mQ7QsGHPLovpW5Ybk7yFxyuBv0m5b6njYFbE3J5hbXFrq6ru02NqQn0PBa+z2CQ0rr4bTTvnddgq6sNbuGuFnGGNnB1iRdxvqfBciiz1nbDGcnO8uTj/pYNP1TYKcRW1AjINy3+tn9Fd5WsPw+KkpTSsga4uAiMJu6Wl3LCHya3J3mbU6695XdbR7H0tZSRQ1Be19M3LHPGM72Dra9v22317R1Lz2LYDD4Xgz18s4Fv5mClfHJIb9EvecrfEocWhQthJdmXq+Wc7HQ3vlNRlN/wBUJX5PLONPBM5PaDDn4NVvqGwl4+k71z7b2JohvTmK+t89+HEr0PBMP+kQysqqdrKaaOOmZSjoxQx6ssfv5udm7V53jHJZRxyG2IyRsHBslM+WQD8UfNce+yHFjjZF8C/ydpXjEZhc7s05z/dzb2MR379X+pXG1lPUSYrUspc2+dPXZcpyuIG9LwD2lmYea9d2FwqOFzIaGKQQiSOaepmbklqjGbsa1o6MQOoHHt74WbJUmH4p/pDf1EsgkmqBEyC7XOlDhlz3sAM/X2JYZW5HK8jL4ZG1FJG/dVk+XLKdTJTggyxRn7DuJ7x4aUeXOLLiwb92npW+gIXabQbB0jKsYhHUVFK+RzagNgg3oil0Li23AXubHtKdttspR4jK3EJamojzMjhLW0xcbsuC7Le4vxRgeUV+Xs/0Gm/eB/hmLnG7P0o2TNbuWmoMwO9Or2jf7vKD1Ny9XDW69E2qwGHFaFrpHzQMhkdK3+bzyPAjbHqy+l8t/NVsN2epp8JfgzJKgRsO+M74chc7e7zKGE+CMBlHN8kEkjcExR0V87Q9zbcQdwdR32usHkPw+kmrX/SWRvcyMOiZLbKTnaJDY6EhhJC9H5OcKp6ImkgfPLvZd890sO5a0NjczLr0r3Xl9bR7PzSuljraii5zi6B8Bmy6m4iew2t2Bx7kgDk/a0bSRBgAaKirDbcA0NmtbutZe80EBMTCetrT8F4ByTQh2NRSR33VOKmcl1gWxNjeAX20B5zb95X0bhbbwxntY0/BaQeDC+CkisYe5MMC1DGmGNbbzkdBlmFRuiWo6JROjVKZlKkzmR6oVrJzglVbjL0yZoUzQoGOViNZM6o9x4YnCMJWqQKDdIi3aXdqRKlke0iyJu77lMlsjIbSuY0x8IPFWrJC1PInAoPitwCryM7lpPYq8katSMJwM/J3JA2xuOPHzVp0SZu1eTDY0cdtPslQzymaTDA9z7uc+GZ0DnOOpLm2sSe1Z+GYC6LNFQUDaMSjJJO+Q1FQ6M9JrHH6sHuXoBjTS1T6cTdaixLBVpKRscbYxwYA30UwYOxPsiy0OXBGGAdSDGDxAKfZLZAYGhqXKnBCAwRmMdg9E4CyckKBhZN3Tb3yi/gnosgEPaUrmtPSAPiLplkoUl5aJ2OA4WHwTw4KslDknEtTZbDh1p4I7FSEieJFLiWrS4CLW6k9hCpCVSMlU7S42l5luxec7R8neHukL24VmB1vBUOgue+O1h5LvmyqVrlDibwsPPMD2UkA+jwUTKKneWmY5zNPUBpuGvkNiG/sj816NFGGtDRwaAPRKHJSUsFuWRCEhCCU0uVENoRwUTmqQuTSU0ZvBX3eqFMhURtKTFYjQhUzOBOE9qELM6EOSoQkaAhCEACEIQA1yicEIVIykRkJhCRCtGLEcEwhCFRDGEIskQmQxCE0oQgkagIQgByaUITECeEIQwXIJwQhSWCRKhMBqEIQCBKChCka5JWlWGFCFDN4ErSlukQoNhpKYShColglQhMkAhCEAf/Z"
    },
    {
      title: "Manage Flight",
      link: "/manage-flight",
       desc: "View and manage all your booked flights in one place.",
       img:"https://www.shutterstock.com/image-photo/man-airliner-computer-display-technology-600nw-203270731.jpg"
    },
     {
      title: "Manage Refund ",
      link: "/manage-refund",
       desc: "View and manage all your booked flights refund.",
       img:"https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTesRpbUZQRIwmMGzSy3fmm4zN-wFmQIlP3Ng&s"
    },
    
  ];

  return (
   <div
  className="min-vh-100 d-flex flex-column"
  style={{
    backgroundImage:
      "url('https://images.alphacoders.com/118/thumb-1920-1181929.jpg')",
    backgroundSize: "cover",
    backgroundPosition: "center",
    color: "white",
  }}
>
  
  <nav
    className="d-flex justify-content-between align-items-center p-3"
    style={{ backgroundColor: "rgba(0,0,0,0.6)" }}
  >
    <div className="fw-bold fs-3">✈️ SimpliFly</div>
    <div className="d-flex gap-3">
      <Link
        to="/Logout"
        className="text-white text-decoration-none fw-bold"
      >
        Logout
      </Link>
      <Link
        to="/profile"
        className="text-white text-decoration-none fw-bold"
      >
        Profile
      </Link>
    </div>
  </nav>

  
  <div className="p-4 text-center" style={{ backgroundColor: "rgba(0,0,0,0.4)" }}>
    <h1 className="display-4 fw-bold">Welcome, Flight Owner!</h1>
    <p className="lead">Manage your Flight with us with easy steps!!!!</p>
  </div>

 
  <div className="container mt-5 mb-5">
    <h4 className="mb-4 text-center text-white">Flight Owner Dashboard</h4>

    <div className="row g-4">
      {cards.map((card) => (
        <div className="col-md-4" key={card.title}>
          <Link
            to={card.link}
            className="card h-100 text-decoration-none text-dark"
            style={{
              backgroundColor: "rgba(255,255,255,0.2)", 
              backdropFilter: "blur(10px)", 
              border: "1px solid rgba(255,255,255,0.3)",
              borderRadius: "15px",
              overflow: "hidden",
              transition: "transform 0.3s, box-shadow 0.3s",
            }}
          >
            <img
              src={card.img}
              className="card-img-top"
              alt={card.title}
              style={{ height: "180px", objectFit: "cover" }}
            />
            <div className="card-body text-center">
               <h5 className="card-title">{card.title}</h5>
              <p className="card-text">{card.desc}</p>
            </div>
          </Link>
        </div>
      ))}
    </div>
  </div>


  <footer
    className="text-center py-4 mt-auto"
    style={{ backgroundColor: "rgba(0,0,0,0.6)" }}
  >
    <p className="mb-0 text-white-50">@2025 SimpliFly. Fly with confidence.</p>
  </footer>
</div>
    
  );
}
