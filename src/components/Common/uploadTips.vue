<template>
	<div class="wrap">
		<div class="container">
			<dl>
				<dt>
					<table id="tb">
        				<tr>
			             	<td>
			                    <input type="text" size="50" class="percent" id="percent" />
			                </td>
			         	</tr>
			         <tr>
			            <td>
			                <input type="text" size="50" class="progressbar" id="progressbar" />
			            </td>
			         </tr>
			     </table>
				</dt>
				<dd>
					照片正在上传中...
				</dd>
			</dl>
		</div>
	</div>
</template>
<script>
 
	export default{
		data(){
			return{
				bar:0 ,
				step: "||"
			}
		},
		methods:{
			progress() {
               this.bar += 2;
                this.step = this.step + "||";
                document.getElementById("percent").value = this.bar + "%";
                document.getElementById("progressbar").value = this.step;
                if (this.bar <= 98) {
                    setTimeout(this.progress(), 100);
                }
            }
		},
		mounted(){
			this.$nextTick(()=>{
				(function () {
		              var ie = !!(window.attachEvent && !window.opera);
		              var wk = /webkit\/(\d+)/i.test(navigator.userAgent) && (RegExp.$1 < 525);
		              var fn = [];
		              var run = function () { for (var i = 0; i < fn.length; i++) fn[i](); };
		              var d = document;
		              d.ready = function (f) {
		                  if (!ie && !wk && d.addEventListener)
		                      return d.addEventListener('DOMContentLoaded', f, false);
		                  if (fn.push(f) > 1) return;
		                  if (ie)
		                     (function () {
		                          try { d.documentElement.doScroll('left'); run(); }
		                          catch (err) { setTimeout(arguments.callee, 0); }
		                      })();
		                  else if (wk)
		                      var t = setInterval(function () {
		                         if (/^(loaded|complete)$/.test(d.readyState))
		                             clearInterval(t), run();
		                     }, 0);
		             };
		         })();
				this.progress();
			})
		}
	}
</script>
<style lang='scss' scoped>
$primary:#c71624;
	.wrap{
		position: absolute;
		top: 0px;
		left: 0px;
		width: 100%;
		height: 100%;
		background-color: rgba(0,0,0,.6);
		z-index: 100;
		.container{
			position: absolute;
			top: 0px;
			bottom: 0px;
			left: 0px;
			right: 0px;
			margin: auto;
			width: 500px;
			height: 200px;
			text-align: center;
			dl{
				width: 100%;
				height: 100%;
				dt,dd{
					width: 100%;
					height: 50%;
				}
				dd{
					font-size: 20px;
					line-height: 28px;
					color: #fff;
				}
			}
		}
		#tb {
            width: 100%;
            height: 100%;
            line-height: 20px;
            font-size: 17px;
        }
  
              #tb tr td {
                  text-align: center;
              }
  
          .progressbar {
              font-family: Arial;
              font-weight: bolder;
              color: $primary;
              background-color: transparent;
              padding: 0px;
              border-style: none;
          }
  
          .percent {
             font-family: Arial;
             color: #fff;
             text-align: center;
             border-width: medium;
             background-color: transparent;
             border-style: none;
         }
	}
</style>