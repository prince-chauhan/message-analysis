document.getElementById('form').addEventListener('submit', e => {
    document.getElementById('sentiment').innerText = '';
    document.getElementById('emoji').src = 'https://i.gifer.com/origin/34/34338d26023e5515f6cc8969aa027bca_w200.gif';
    document.getElementsByClassName('separator')[0].style.display='flex'
    document.getElementById('emoji').style.display = 'block';
    e.preventDefault();
    const text = document.getElementById('message').value;
    fetch('/sentiment', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ message: text })
    })
        .then(res => res.json())
        .then(data => {
            let sent;
            let conf;
            let url;
            if (data.sentiments.match) {
                sent = 'Negative'
                conf = data.sentiments.probabilities['1'].toFixed(5)
                url='https://img.icons8.com/?size=512&id=sPjBR8fnZch2&format=png'
            }
            else {
                sent = 'Positive'
                conf = data.sentiments.probabilities['0'].toFixed(5)
                url='https://img.icons8.com/?size=512&id=r_Vph1MWIfJQ&format=png'
            }
            

            document.getElementById('sentiment').innerText = 'Your message is '+sent + ', with ' + conf+' confidence score';
            document.getElementById('emoji').src = url;
        })
        .catch(error => console.error('Error:', error));
});

document.getElementById('message').innerHTML=''