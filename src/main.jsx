import ReactDOM from 'react-dom/client'
import App from './App'
import 'animate.css';
const root = ReactDOM.createRoot(document.getElementById('root'))

function Flex(){
	return <div className = 'flex justify-center text-white w-full h-full'>
		<App/>
	</div>
}

root.render(<Flex></Flex>)




