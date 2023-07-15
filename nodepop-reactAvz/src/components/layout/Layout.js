import Header from "./Header";

const Layout = ({title, children, ...rest}) => {
  return (
    <div>
      <Header {...rest} />
      
      <main>
        <div style={{textAlign:'center'}}>
        <h2 >{title}</h2>
        {children}
        </div>
      </main>
        
      <footer>@ 2023 NodePop</footer>
    </div>
  );
};

export default Layout;

